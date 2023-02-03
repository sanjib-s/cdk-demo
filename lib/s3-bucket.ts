import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface s3StackProps extends cdk.StackProps {
   readonly envConfig: any;
}

export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: s3StackProps) {
    super(scope, id, props);

    //accessing env variable 

    console.log('deployment_Env', process.env.deployment_Env)
    var deployment_Env = process.env.deployment_Env;

    const s3Bucket = new s3.Bucket(this, 'exampleBucket', {
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryptionKey: new kms.Key(this, 's3BucketKMSKey'),
    });

    s3Bucket.grantRead(new iam.AccountRootPrincipal());
  }
}