import { defineConfig } from "cypress";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*"
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      registerCodeCoverageTasks(on, config);
      return config;
    },
    port: 3002,
    viewportWidth: 1920,
    viewportHeight: 1080
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack"
    },
    specPattern: "**/*.cy.ts"
  }
});
