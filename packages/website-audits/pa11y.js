const urls = require("./urls");

module.exports = {
  defaults: {
    runners: ["axe", "htmlcs"],
    hideElements: ".pa11y-ignore-element",
    chromeLaunchConfig: {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  },
  urls,
};
