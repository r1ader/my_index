import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      'r_animate' : path.resolve(__dirname, './src/utils/r_animate')
    },
  },
  plugins: [vue()]
})
