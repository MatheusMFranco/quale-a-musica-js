import { VitePWA } from 'vite-plugin-pwa';

export default {
  root: 'src',
  build: {
    outDir: '../dist',
  },
  resolve: { alias: { '@': '/src' } },
  server: {
    host: true,
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../src/.test/setup.js'],
    include: ['**/(*.)?{test,spec}.js'],
    exclude: [
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      '.husky',
      '.vscode',
    ],
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Qual é a Música?',
        short_name: 'Quale',
        description: 'A music quiz game',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/images/favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
};
