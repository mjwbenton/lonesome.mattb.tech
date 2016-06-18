### AWS Setup

#### Cloudfront

* `$ s3_website cfg apply`
* Say yes to cloudfront
* When cloudfront domain is deployed, change DNS over to being an ALIAS record for cloudfront

#### HTTPS

* Make a new certificate in AWS certificate manager
* Verify domain owner
* Bind to cloudfront domain
* Use s3_website push --force to force clear the caches
