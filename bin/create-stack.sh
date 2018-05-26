#!/bin/zsh

STACK_NAME=mattb-tech-website
PROFILE=test.mattb.tech-deploy

aws cloudformation create-stack \
    --profile=$PROFILE \
    --stack-name=$STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --template-body=file://cloudformation.yaml

echo "Creating $STACK_NAME stack"

aws cloudformation wait stack-create-complete \
    --stack-name=$STACK_NAME \
    --profile=$PROFILE
