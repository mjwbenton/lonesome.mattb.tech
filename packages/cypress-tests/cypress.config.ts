import { defineConfig } from "cypress";
import { cleanEnv, str } from "envalid";

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const env = cleanEnv(process.env, {
        TEST_AUTH_SECRET: str(),
      });

      // Pass the environment variable to Cypress
      config.env = {
        ...config.env,
        TEST_AUTH_SECRET: env.TEST_AUTH_SECRET,
      };

      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "https://lonesome.mattb.tech",
  },
});
