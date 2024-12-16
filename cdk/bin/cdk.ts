#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/cdk-stack';

const app = new cdk.App();
new PipelineStack(app, 'ADPPipelineStack', {
    env: { account: '401955065246', region: 'eu-central-1' },
  });