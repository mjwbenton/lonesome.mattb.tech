# @mattb.tech/lonesome-edge-router

Lambda@Edge function that handles re-routing requests so that my next.js static website works as expected.

1. Requests ending in a slash, e.g. `/` have `index.html` added to the end when going to the origin.
2. Requests that do not have a file extension, have `.html` added to the end when looking to the origin
3. Requests with `.html` at the beginning are redirected to the same address without `.html` on the end
