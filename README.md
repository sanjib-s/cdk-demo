         ___        ______    
        / \ \      / / ___|   
       / _ \ \ /\ / /\___ \  
      / ___ \ V  V /  ___) | 
     /_/   \_\_/\_/  |____/   
 ------------------------------

# Welcome to your CDK TypeScript project for Multiple Environment deployment

AWS CDK Construct for deployment of AWS Services

Pre-requisite

	· AWS CLI
	· CDK ToolKIT
	· AWS Profile setup 
	· AWS Role with required permission based on the resources planning to deploy
 


This CDK project covers below Production use cases

    · AWS Services deployment across environment (Development /Production etc).
    · Ability to define variable based on environment
    · Output value of each deployed resource
    . All output get stored in AWS Parameter store which help hierarchical storage for configuration data management



Coding Standards followed

	· Multiple  Environment deployment - Its achieved using git branch function. Each environment can be mapped to   specific git branch
	· Environment specific variable  - Use of CDK context ( refer cdk.json)
	· Deployed resources values (ARN, name) as output using CfnOutput

Getting Started

	· One the pre-requisite of AWS CLI and CDK Toolkit are completed
	· Switch to AWS Profile 
	· Clone the repo 

	· CDK bootstrap - It’s the process of provisioning resources for the AWS CDK before we can deploy AWS CDK apps to our account
	Command  cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1

	· Update environment specific variables in cdk.json file

	· To Synthesize CDK app and generate CloudFormation template
	Command -  cdk synth  
         
	· Deploy  
           Command  - cdk deploy 

For additional details refer - https://slalom.atlassian.net/wiki/spaces/DEVOPS/pages/3099164699/AWS+CDK+Starter 

Contributions

If you'd like  additional AWS services  please submit a PR. For bugs/security issues, please create a new issue and follow the instructions. Thanks.!



## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

Note - Region and account details need to be updated in cdk.json before deploying
