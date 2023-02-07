#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
//import { CdkDemoStack } from '../lib/cdk-ec2-sqs-sns';
import { S3BucketStack } from '../lib/s3bucket';

const envcanada = {account: '456456010743', region: 'ca-central-1' };

const envConfig = getConfig();

const app = new cdk.App();


//new CdkDemoStack(app, 'Cdkdemostack' ,{env: envcanada});
new S3BucketStack(app, 'S3BucketStack' ,{ env:envcanada, envConfig });

function getConfig() {
    let parsedConfig;
    let deployment_Env = String(process.env.deployment_Env).toLowerCase();
    if (!deployment_Env) {
        throw new Error('Please set the deployment env');
                   }
     switch (deployment_Env) {
        case 'sandbox':
        case 'sbx':
            parsedConfig = JSON.parse(fs.readFileSync(`./config/sandbox.json`, 'utf8'));           
          break;
        case 'production':
        case 'prod':
                parsedConfig = JSON.parse(fs.readFileSync(`./config/production.json`, 'utf8'));           
        break;
}
return parsedConfig;
}