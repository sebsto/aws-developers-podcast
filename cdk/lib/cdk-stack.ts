import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import { Platform } from 'aws-cdk-lib/aws-ecr-assets';

import { Construct } from 'constructs';

const getGithubConnectionArn = (scope: Construct): string => {
  const account = cdk.Stack.of(scope).account;
  
  switch (account) {
    case '401955065246': // Development account
      return 'arn:aws:codestar-connections:eu-central-1:401955065246:connection/1a3722f1-bd2f-40d4-badf-accd624640c6';
    case 'xxx': // Production account
      return 'todo';
    default:
      throw new Error(`No GitHub connection ARN configured for account ${account}`);
  }
};

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
    // create an image and upload it to the ECR repo created during the bootstrap
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
          branch: 'new_look', 
          connectionArn: getGithubConnectionArn(this), // Use the ARN directly
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


  }
}
