/* eslint-env node */

import { chrome } from '../../electron-vendors.config.json';
import { join } from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadAndSetEnv } from '../../scripts/loadAndSetEnv.mjs';
//custom
import styleImport from 'vite-plugin-style-import';
import Components from 'vite-plugin-components';
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import WindiCSS from 'vite-plugin-windicss';

const PACKAGE_ROOT = __dirname;

/**
 * Vite looks for `.env.[mode]` files only in `PACKAGE_ROOT` directory.
 * Therefore, you must manually load and set the environment variables from the root directory above
 */
loadAndSetEnv(process.env.MODE, process.cwd());

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  root: PACKAGE_ROOT,
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  base: '',
  build: {
    sourcemap: false,
    target: `chrome${chrome}`,
    polyfillDynamicImport: false,
    outDir: 'dist',
    assetsDir: '.',
    terserOptions: {
      ecma: 2020,
      compress: {
        passes: 2,
      },
    },
    rollupOptions: {
      external: [...builtinModules],
    },
    emptyOutDir: true,
  },
});
