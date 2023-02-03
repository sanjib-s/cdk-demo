import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class CdkDemoStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkDemoQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkDemoTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));
    
    const defaultvpc =ec2.Vpc.fromLookup(this, 'vpc',{isDefault: true})
    const ami= new ec2.LookupMachineImage({name:'ami-06c3426233c180fef'})
   const ec2instance = new ec2.Instance(this, 'sample-ec2', {instanceType:new ec2.InstanceType('t2.micro'),
                       machineImage:ami,vpc:defaultvpc})
  }
}
