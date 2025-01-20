#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/PipelineStack';
import { WAFStack } from '../lib/WAFStack';

const dev_account = '401955065246'
const prod_account = '533267385481'

const app = new cdk.App();

// deploy separatly, then report ARN to the PipelineStack
// cdk --profile podcast deploy WAFStack  
new WAFStack(app, 'PodcastWAFStack', {
  env: { account: prod_account, region: 'us-east-1' }, // WAF rules must be deployed in us-east-1
});

new PipelineStack(app, 'ADPPipelineStack', {
  env: { account: prod_account, region: 'us-west-2' },
  }
);
 