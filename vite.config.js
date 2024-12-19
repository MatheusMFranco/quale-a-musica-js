import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    open: true,
    hmr: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.js', '.ts', '.vue', '.json'],
  },
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['setupTests.js'],
    include: ['**/*.test.js', '**/*.spec.js'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
    postcss: {
      plugins: [],
    },
  },
  define: {
    'process.env.NODE_ENV': '"development"',
  },
});
