#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as fs from 'fs';
import { DemoAppS3Stack} from '../lib/s3-bucket';

import { CDKContext } from '../common/types';
import gitBranch from 'git-branch';

// Get CDK Context based on git branch
export const getContext = async (app: cdk.App): Promise<CDKContext> => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentBranch = await gitBranch();

      const environment = app.node.tryGetContext('environments').find((e: any) => e.branchName === currentBranch);

      const globals = app.node.tryGetContext('globals');

      return resolve({ ...globals, ...environment });
    } catch (error) {
      console.error(error);
      return reject();
    }
  });
};

// Create Stacks
const createStacks = async () => {
  try {
    const app = new cdk.App();
    const context = await getContext(app);

    const tags: any = {
      Environment: context.environment,
    };

    const stackProps: cdk.StackProps = {
      env: {
        region: context.region,
        account: context.accountNumber,
      },
      stackName: '${context?.application}-${context?.environment}',
      tags,
    };

    new DemoAppS3Stack(app, `${context.application}-cdk-base-stack-${context.environment}`, stackProps, context);
  } catch (error) {
    console.error(error);
  }
};

createStacks();
