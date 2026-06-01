import reporter from 'cucumber-html-reporter';
import path from 'path';

const options = {
  theme: 'bootstrap',
  jsonFile: path.resolve('test-results/cucumber-report.json'),
  output: path.resolve('test-results/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    App: 'Sauce Demo',
    Browser: 'Chromium',
    Platform: process.platform,
    Execution: 'Cucumber Playwright'
  }
};

reporter.generate(options);
console.log('Generated Cucumber HTML report at test-results/cucumber-report.html');
