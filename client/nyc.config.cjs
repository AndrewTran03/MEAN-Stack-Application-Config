module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  checkCoverage: true,
  cache: false,
  include: ['src/**/*.ts', 'src/**/*.html'],
  exclude: [
    "./coverage/**",
    "cypress/**",
    "./dist/**",
    "**/*.spec.ts",
    "./src/main.ts",
    "./src/test.ts",
    "**/*.conf.js"
  ]
};
