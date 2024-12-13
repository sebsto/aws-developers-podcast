import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create artifact objects
    const sourceOutput = new codepipeline.Artifact('SourceOutput');
    const buildOutput = new codepipeline.Artifact('BuildOutput');

    // Create the build project
    const buildProject = new codebuild.PipelineProject(this, 'BuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
      },
      buildSpec: codebuild.BuildSpec.fromSourceFilename('buildspec.yaml'),
      projectName: 'AWSDevelopersPodcastBuildProject',
    });

    // Create the pipeline
    const pipeline = new codepipeline.Pipeline(this, 'DeploymentPipeline', {
      pipelineName: 'AWSDevelopersPodcastBuildPipeline',
      crossAccountKeys: false, // If you're deploying to the same account
    });

    // Add source stage
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new codepipeline_actions.GitHubSourceAction({
          actionName: 'GitHub_Source',
          owner: 'GITHUB_OWNER', // Replace with your GitHub username or org
          repo: 'REPO_NAME', // Replace with your repo name
          branch: 'main', // Or your default branch
          oauthToken: cdk.SecretValue.secretsManager('github-token'), // Store your GitHub token in Secrets Manager
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

    // Add deploy stage (example with CodeDeploy)
    // You can modify this based on your deployment needs
    pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new codepipeline_actions.CodeDeployServerDeployAction({
          actionName: 'Deploy',
          input: buildOutput,
          deploymentGroup: cdk.aws_codedeploy.ServerDeploymentGroup.fromServerDeploymentGroupAttributes(
            this,
            'DeploymentGroup',
            {
              deploymentGroupName: 'YOUR_DEPLOYMENT_GROUP_NAME', // Replace with your deployment group name
              application: cdk.aws_codedeploy.ServerApplication.fromServerApplicationName(
                this,
                'Application',
                'YOUR_APPLICATION_NAME' // Replace with your application name
              ),
            }
          ),
        }),
      ],
    });
  }
}
