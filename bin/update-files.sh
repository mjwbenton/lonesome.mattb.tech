#!/bin/zsh

BUCKET_NAME=mattb.tech
CLOUD_FORMATION_DISTRIBUTION_ID=E34GUQO2H8CWV4
PROFILE=test.mattb.tech-deploy

aws s3 sync --acl public-read --delete \
    --exclude "*" --include "*.html" \
    --content-type "text/html; charset=utf-8" --metadata-directive=REPLACE \
    ./output s3://$BUCKET_NAME/ \
    --profile $PROFILE
aws s3 sync --acl public-read --delete \
    --include "*" --exclude "*.html" \
    ./output s3://$BUCKET_NAME/ \
    --profile $PROFILE

aws cloudfront create-invalidation \
        --distribution-id $CLOUD_FORMATION_DISTRIBUTION_ID \
        --profile $PROFILE \
        --paths '/*'
