module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  checkCoverage: true,
  cache: false,
  lines: 50,
  statements: 50,
  functions: 50,
  branches: 50,
  include: ['src/**/*.ts', 'src/**/*.html'],
  exclude: [
    "./coverage/**",
    "cypress/**",
    "./dist/**",
    "**/*.spec.ts",
    "./src/main.ts",
    "./src/test.ts",
    "**/*.conf.js"
  ],
  reporter: ["html", "text-summary", "lcov"],
};
