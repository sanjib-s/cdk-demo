import {Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

// Types
import { CDKContext } from '../common/types';

//interface s3StackProps extends cdk.StackProps {
//   readonly envConfig: any;
//}

export class DemoAppS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps, context: CDKContext) {
    super(scope, id, props);

    //accessing env variable 

    console.log('deployment_Env', process.env.deployment_Env)
    var deployment_Env = process.env.deployment_Env;

    const s3Bucket = new s3.Bucket(this, 'exampleBucket', {
      bucketName: `${context.environment}-${context.dept}-${context.application}-${context.accountNumber}`,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
    });

    s3Bucket.grantRead(new iam.AccountRootPrincipal());

    //Stack Outputs
    new CfnOutput(this, 'exampleBucketArn', {
      value: exampleBucket.bucketArn,
      exportName: '${context.application}-${context.environment}-exampleBucket',
    });
  }
}