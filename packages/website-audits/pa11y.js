const urls = require("./urls");

module.exports = {
  defaults: {
    runners: ["axe", "htmlcs"],
    hideElements: ".pa11y-ignore-element",
  },
  urls,
};
