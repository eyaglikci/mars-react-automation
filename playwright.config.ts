import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/step_definitions/**/*.ts',
  outputDir: '.features-gen',
  verbose: true
});

export default defineConfig({
  testDir,

  timeout: 120000,

  expect: {
    timeout: 15000
  },

  workers: 1,
  fullyParallel: false,

  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never'
      }
    ]
  ],

  use: {
    headless: process.env.CI === 'true',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      }
    }
  ]
});