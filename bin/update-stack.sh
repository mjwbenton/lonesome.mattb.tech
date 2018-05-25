#!/bin/zsh

STACK_NAME=photo-mattb-tech
PROFILE=test.mattb.tech-deploy

aws cloudformation update-stack \
    --profile=$PROFILE \
    --stack-name=$STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --template-body=file://cloudformation.yaml

echo "Updating $STACK_NAME stack"

aws cloudformation wait stack-update-complete \
    --stack-name=$STACK_NAME \
    --profile=$PROFILE
