// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

// Read environment from ENV variable, default to 'qa'
const ENV = process.env.TEST_ENV || 'qa';

const environments = {
  qa: {
    baseURL: 'https://www.fodors.com/',
  
  },
  stage: {
    baseURL: 'https://leevalley.com/',
  },
  prod: {
    baseURL: '',

  },
};

const currentEnv = environments[ENV];

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: ENV === 'prod' ? 2 : 1,   // more retries on prod
  workers: ENV === 'prod' ? 1 : 2,   // safer on prod

  use: {
    baseURL: currentEnv.baseURL,
    extraHTTPHeaders: {
      'x-api-url': currentEnv.apiURL,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  reporter: [
    ['html', { outputFolder: `reports/${ENV}` }],
    ['junit', { outputFile: `reports/${ENV}/results.xml` }],
  ],
});