import { defineConfig } from 'tsup';
export default defineConfig({
  entry: {
    main: 'src/index.tsx',
  },
  minify: true,
  target: 'es2015',
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ['iife'],
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  outExtension() {
    return {
      js: '.js',
    };
  },
});
