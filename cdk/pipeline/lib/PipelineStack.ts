import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

import { Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Construct } from 'constructs';


const getGithubConnectionArn = (scope: Construct): string => {
  const account = cdk.Stack.of(scope).account;
  
  switch (account) {
    case '401955065246': // Development account
      return 'arn:aws:codestar-connections:eu-central-1:401955065246:connection/1a3722f1-bd2f-40d4-badf-accd624640c6';
    case '533267385481': // Production account
      return 'arn:aws:codestar-connections:us-west-2:533267385481:connection/5cbad601-4ff6-4618-a47e-02a7495d90fe';
    default:
      throw new Error(`No GitHub connection ARN configured for account ${account}`);
  }
};

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create SNS topic for build failure notifications
    const buildFailureTopic = new sns.Topic(this, 'BuildFailureTopic', {
      topicName: 'aws-developers-podcast-build-failures',
      displayName: 'AWS Developers Podcast Build Failures'
    });

    // Add email subscription
    buildFailureTopic.addSubscription(new subscriptions.EmailSubscription('stormacq@amazon.com'));
  
    // create an image and upload it to the ECR repo created during the bootstrap
    // must disable containerd in docker for this to work
    // see https://github.com/aws/aws-cdk/issues/31549
    const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
      environment: {
        // buildImage: codebuild.LinuxBuildImage.fromEcrRepository(repository, 'latest'),
        buildImage: codebuild.LinuxBuildImage.fromAsset(this, 'ADPBuildImage', {
          directory: './docker',
          platform: Platform.LINUX_ARM64,
        }),
        privileged: false,
        },
      buildSpec: codebuild.BuildSpec.fromSourceFilename('buildspec.yaml'),
      projectName: 'AWSDevelopersPodcastBuildProject',
    });

    // https://github.com/aws/aws-cdk/issues/5517#issuecomment-568596787
    const cfnArmTestProject = buildProject.node.defaultChild as codebuild.CfnProject
    cfnArmTestProject.addOverride('Properties.Environment.Type','ARM_CONTAINER')

    // Import existing S3 bucket for website hosting
    const websiteBucket = s3.Bucket.fromBucketName(this, 'AWSDevelpersPodcastBucket', 
      'aws-developers-podcast-media' 
    );

    // Create the pipeline
    const pipeline = new codepipeline.Pipeline(this, 'DeploymentPipeline', {
      pipelineName: 'AWSDevelopersPodcastPipeline',
      crossAccountKeys: false, // If you're deploying to the same account
      pipelineType: codepipeline.PipelineType.V2,
      executionMode: codepipeline.ExecutionMode.QUEUED
    });

    // Create artifact objects
    const sourceOutput = new codepipeline.Artifact('SourceOutput');
    const buildOutput = new codepipeline.Artifact('BuildOutput');

    // Add source stage
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new codepipeline_actions.CodeStarConnectionsSourceAction({
          actionName: 'GitHub_Source',
          owner: 'sebsto', 
          repo: 'aws-developers-podcast', 
          branch: 'main', 
          connectionArn: getGithubConnectionArn(this), // Use the ARN directly
          codeBuildCloneOutput: true, // clone insteda of copy to get version history during the build
          output: sourceOutput,
        }),
      ],
    });

    // Add build stage
    pipeline.addStage({
      stageName: 'Build',
      actions: [
        new codepipeline_actions.CodeBuildAction({
          actionName: 'Build',
          project: buildProject,
          input: sourceOutput,
          outputs: [buildOutput],
        }),
      ],
    });

    // Add deployment stage to S3
    pipeline.addStage({
      stageName: 'Deploy', 
      actions: [
        new codepipeline_actions.S3DeployAction({
          actionName: 'DeployToS3',
          bucket: websiteBucket,
          input: buildOutput,
          objectKey: 'web', // Deploy under /web prefix
        }),
      ],
    });

    // Create EventBridge rule for pipeline failures
    const pipelineFailureRule = new events.Rule(this, 'PipelineFailureRule', {
      eventPattern: {
        source: ['aws.codepipeline'],
        detailType: ['CodePipeline Pipeline Execution State Change'],
        detail: {
          state: ['FAILED'],
          pipeline: [pipeline.pipelineName]
        }
      }
    });

    // Add SNS topic as target for the rule
    pipelineFailureRule.addTarget(new targets.SnsTopic(buildFailureTopic, {
      message: events.RuleTargetInput.fromText(
        'AWS Developers Podcast pipeline failed!\n\n' +
        'Pipeline: ${detail.pipeline}\n' +
        'Execution ID: ${detail.execution-id}\n' +
        'State: ${detail.state}\n' +
        'Time: ${time}'
      )
    }));

    // There is no L2 construct for scheduler yet 
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_scheduler-readme.html
    
    // Create an IAM role for the scheduler to invoke CodePipeline
    const schedulerRole = new iam.Role(this, 'SchedulerRole', {
      assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
    });
    
    // Add permission to start pipeline execution
    schedulerRole.addToPolicy(new iam.PolicyStatement({
      actions: ['codepipeline:StartPipelineExecution'],
      resources: [pipeline.pipelineArn],
    }));
    
    // Create the schedule
    const scheduleFriday = new scheduler.CfnSchedule(this, 'ADPFridayPipelineSchedule', {
      flexibleTimeWindow: {
        mode: 'OFF'
      },
      scheduleExpression: 'cron(0 4 ? * FRI *)',
      scheduleExpressionTimezone: 'UTC',
      target: {
        arn: pipeline.pipelineArn,
        roleArn: schedulerRole.roleArn,
        input: JSON.stringify({}),
      },
      name: 'developers-podcast-friday-pipeline',
      description: 'Triggers the Developers Podcast pipeline every Friday at 4am UTC',
      state: 'ENABLED',
    });
    
    //
    // Cloudfront 
    //

    // Import existing ACM certificate
    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', 
      'arn:aws:acm:us-east-1:533267385481:certificate/bf3dcc3c-1e7e-4c6f-9956-ad636633a79a'
    );

    // Create CloudFront distribution
    // https://aws.amazon.com/blogs/devops/a-new-aws-cdk-l2-construct-for-amazon-cloudfront-origin-access-control-oac/
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      webAclId: 'arn:aws:wafv2:us-east-1:533267385481:global/webacl/WebACL-2ijNukbvUyvs/4f9531f2-64dd-49a7-a220-d77130d5f4fa',   // created with PodcastWAFStack in us-east-1
      defaultBehavior: {
        // we have to change the permission on the bucket manually 
        // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudfront_origins-readme.html#setting-up-oac-with-imported-s3-buckets
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        compress: true,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED
      },
      domainNames: ['developers.podcast.go-aws.com'],
      certificate: certificate,
      defaultRootObject: '',
      enabled: true,
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      enableIpv6: true,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(10),
        },
      ],
      logBucket: s3.Bucket.fromBucketName(this, 'LogBucket', 'aws-podcasts-cloudfront-logs'),
      logFilePrefix: 'AWSDevelopersPodcast',
      logIncludesCookies: false,
    });

    // Grant the CloudFront distribution access to the S3 bucket
    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [websiteBucket.arnForObjects('*')],
      principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
      conditions: {
        StringEquals: {
          'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${distribution.distributionId}`
        }
      }
    }));    

    // Output the website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The URL of the website',
    });
  }
}
