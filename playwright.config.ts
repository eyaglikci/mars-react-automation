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
  ['html', { open: 'always' }]
],

  use: {
    headless: false,

    launchOptions: {
      slowMo: 700
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});