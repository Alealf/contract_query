/*
 * @Author: liu jinwei kk2324982471@163.com
 * @Date: 2023-04-06 10:29:42
 * @LastEditors: liu jinwei kk2324982471@163.com
 * @LastEditTime: 2023-04-14 20:10:41
 * @FilePath: \doc_query_vue\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host:'118.31.45.5',
    port: '8000',
    proxy: {
      '/api': {
        target: 'http://118.31.45.5:8000/',
        // target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }

})
