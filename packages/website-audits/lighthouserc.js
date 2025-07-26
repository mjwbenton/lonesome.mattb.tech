const urls = require("./urls");

module.exports = {
  ci: {
    collect: {
      url: urls,
      settings: {
        useThrottling: false,
      },
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "csp-xss": "warn",
        "font-size": "warn",
        "image-aspect-ratio": "warn",
        "image-size-responsive": "warn",
        "meta-description": "warn",
        "offscreen-images": "warn",
        "unsized-images": "warn",
        "unused-javascript": "warn",
        "uses-optimized-images": "warn",
        "uses-responsive-images": "warn",
        "is-crawlable": "off",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
