const common = [
  'features/**/*.feature',
  '--require tests/cucumber/support/world.js',
  '--require tests/cucumber/support/hooks.js',
  '--require tests/cucumber/steps/amazon.steps.js',
  '--format progress-bar',
  '--format json:test-results/cucumber-report.json',
  '--format allure-cucumberjs/reporter',
  '--format-options \'{"resultsDir": "allure-results"}\'',
].join(' ');

module.exports = {
  default: common,
};
