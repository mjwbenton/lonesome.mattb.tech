const urls = require("./urls");

module.exports = {
  ci: {
    collect: {
      url: urls,
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "unused-javascript": "warn",
        "unsized-images": "warn",
        "meta-description": "warn",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
