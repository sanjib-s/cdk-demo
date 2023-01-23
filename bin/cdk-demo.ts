#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkDemoStack } from '../lib/cdk-demo-stack';

const envcanada = {account: 'xxxx', region: 'xxx' };

const app = new cdk.App();


new CdkDemoStack(app, 'Cdkdemostack' ,{env: envcanada});
