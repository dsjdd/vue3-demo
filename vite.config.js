import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 是否开启$ref,vue3.2语法糖
    vue({
      refTransform:true,
      reactivityTransform:true
  }),
],
server:{

},

// 打包相对路径
base:"./"
})
