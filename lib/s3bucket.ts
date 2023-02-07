import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface s3StackProps extends cdk.StackProps {
   readonly envConfig: any;
}

export class S3BucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: s3StackProps) {
    super(scope, id, props);
  
    //accessing env variable 

     var deployment_Env  = this.node.tryGetContext('deployment_Env');
     
    //console.log('deployment_Env', process.env.deployment_Env)
    //var deployment_Env = process.env.deployment_Env;

    const prefix = props.envConfig?.application + '-' + props.envConfig?.dept;
    
  

    //let altprefix = props.envConfig?.application + props.envConfig?.dept;

    console.log ("bucket prefix:"+prefix);

    const s3Bucket = new s3.Bucket(this, 'exampleBucket1', {
      bucketName: `${prefix}-bucket1`,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      //encryption: s3.BucketEncryption.KMS,
      encryption: BucketEncryption.KMS,
      encryptionKey: props.envConfig?.kms_arn,
      
    });
    //console.log ("key:"+encryptionKey)
    s3Bucket.grantRead(new iam.AccountRootPrincipal());
    tags: props.envConfig?.tags
      }
    }