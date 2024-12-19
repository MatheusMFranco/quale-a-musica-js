import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.js'],
      exclude: [
            'dist/**',
            '.stryker-tmp/**',
            'stryker-tmp/**',
            'src/**/*.spec.js',
            'src/main.js',
            'src/dist/**',
            'src/setupTests.js',
            '**/node_modules/**',
            '**/*.d.ts',
        ],
    },
    globals: true,
  }
});
