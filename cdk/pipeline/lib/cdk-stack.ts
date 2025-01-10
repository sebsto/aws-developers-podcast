import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
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

    // Output the website URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: websiteBucket.bucketWebsiteUrl,
      description: 'The URL of the website',
    });
  }
}
