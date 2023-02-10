import {Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import { CfnDisk } from 'aws-cdk-lib/aws-lightsail';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

// Types
import { CDKContext } from '../common/types';

//interface s3StackProps extends cdk.StackProps {
//   readonly envConfig: any;
//}

export class DemoAppS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps, context?: CDKContext) {
    super(scope, id, props);

    //accessing env variable 

    //console.log('deployment_Env', process.env.deployment_Env)
    //var deployment_Env = process.env.deployment_Env;

    const DemoApps3Bucket = new s3.Bucket(this, 'exampleBucket', {
      bucketName: `${context?.environment}-${context?.dept}-${context?.application}-${context?.accountNumber}`,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
    });

    DemoApps3Bucket.grantRead(new iam.AccountRootPrincipal());

    const s3BucketArn = DemoApps3Bucket.bucketArn;
    console.log('bucketArn', s3BucketArn);

    //S3 bucket ARN Output

    new CfnOutput(this, 'exampleBucketArn', {
      value: s3BucketArn,
      description: 'arn of demo app s3 bucket',
    })

    new ssm.StringParameter(this, 'S3buccket-arn-Parameter', {
      allowedPattern: '.*',
      description: 'S3 bucket ARN',
      //parameterName: '/${context?.environment}/S3bucket/${context?.application}',
      //stringValue: 's3BucketArn',
      parameterName: 's3bucket',
      stringValue: s3BucketArn,

      tier: ssm.ParameterTier.ADVANCED,
    });

  }
} 