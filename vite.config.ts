import {defineConfig} from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import packageConf from './package.json';
import copy from 'rollup-plugin-copy';

const tarFileName = `${packageConf.name}`;
const isDev = process.env.NODE_ENV === 'development';
const rollupPlugins = [];

if (!isDev) {
  console.log('copy');
  rollupPlugins.push(
    copy({
      targets: [{src: 'package.json', dest: `build/${tarFileName}`}],
      verbose: true,
      hook: 'writeBundle',
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: `build/${tarFileName}`,
    rollupOptions: {
      plugins: rollupPlugins,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://qm-tptest.qmhost1.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
});
