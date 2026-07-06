# AWS Developers Podcast - CDK Pipeline

This CDK project defines the CI/CD pipeline infrastructure for the AWS Developers Podcast.

## Stacks

- **ADPPipelineStack** — CodePipeline, CodeBuild, CloudFront, S3 deploy, EventBridge schedule (us-west-2)
- **PodcastWAFStack** — WAF rules (must be deployed in us-east-1)

## Prerequisites

- AWS CLI configured with profile `podcast`
- Node.js **22.x** (supported by CDK). See [Node compatibility](#node-compatibility) below.

## Deploy

```bash
npm install
npm run build
./node_modules/.bin/cdk deploy ADPPipelineStack --profile podcast --region us-west-2 --require-approval never
```

To deploy the WAF stack (separate, us-east-1):

```bash
./node_modules/.bin/cdk deploy PodcastWAFStack --profile podcast --region us-east-1 --require-approval never
```

## Useful commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JS |
| `npm run watch` | Watch for changes and compile |
| `npm run test` | Run jest unit tests |
| `./node_modules/.bin/cdk diff` | Compare deployed stack with current state |
| `./node_modules/.bin/cdk synth` | Emit the synthesized CloudFormation template |

## Node compatibility

CDK 2.172.0 supports **Node 22.x**. Using Node 26+ causes `npx` to silently swallow all CDK output (stdout and stderr), making commands appear to succeed with no output and no deployment.

**Workaround** (if you're on Node 26+): call the CDK binary directly instead of using `npx`:

```bash
./node_modules/.bin/cdk <command>
```

**Recommended fix**: use a Node version manager (nvm, fnm) and switch to Node 22 for this project:

```bash
nvm use 22
# or
fnm use 22
```

The `.nvmrc` file at the repo root specifies the expected Node version.
