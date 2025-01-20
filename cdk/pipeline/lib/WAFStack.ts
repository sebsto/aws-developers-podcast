import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export class WAFStack extends cdk.Stack {
	public readonly webAcl: wafv2.CfnWebACL;

	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
			super(scope, id, props);

    // WAF ruleset to simulate console's core protection 
    // https://stackoverflow.com/questions/77793841/how-do-i-configure-core-protections-and-rate-limiting-in-cloudformation-temp
    this.webAcl = new wafv2.CfnWebACL(this, 'WebACL', {
      defaultAction: { allow: {} },
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'AWSDevelopersPodcastWafMetrics',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'AWSManagedRulesAmazonIpReputationList',
          priority: 1,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              name: 'AWSManagedRulesAmazonIpReputationList',
              vendorName: 'AWS'
            }
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesAmazonIpReputationListMetric',
            sampledRequestsEnabled: true,
          }
        },
        {
          name: 'AWSManagedRulesCommonRuleSet',
          priority: 2,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              name: 'AWSManagedRulesCommonRuleSet',
              vendorName: 'AWS'
            }
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesCommonRuleSetMetric',
            sampledRequestsEnabled: true,
          }
        },
        {
          name: 'AWSManagedRulesKnownBadInputsRuleSet',
          priority: 3,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              name: 'AWSManagedRulesKnownBadInputsRuleSet',
              vendorName: 'AWS'
            }
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesKnownBadInputsRuleSetMetric',
            sampledRequestsEnabled: true,
          }
        }
      ]
      
    });   
		
    new cdk.CfnOutput(this, 'WebACLArn', {
      value: this.webAcl.attrArn,
      description: 'The ARN of the WebACL',
      exportName: 'WebACLArn'
    });		
	}
} 