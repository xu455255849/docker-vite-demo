import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'configure-response-headers',
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next()
        })
      }
    },
    vue(),
    vueJsx({})
],
  // 引用使用less的库要配置一下
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1374F6',
          'link-color': '#1374F6',
          'success-color': '#52c41a',
          'warning-color': '#faad14',
          'error-color': '#f5222d',
          'text-color': 'rgba(0, 0, 0, 0.8)', // 主文本色
          'text-color-secondary': 'rgba(0, 0, 0, 0.4)', // 次文本色
          'disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
          'border-color-base': 'rgba(0, 0, 0, 0.15)', // 边框
          // 'box-shadow-base': 'rgba(0, 0, 0, 0.15)', // 浮层阴影
        },
        javascriptEnabled: true,
      }
    },
  },
  server: {
    port: 9060,
  }
})
