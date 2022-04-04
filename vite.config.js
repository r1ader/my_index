import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
    resolve: {
        alias: {
            'ractjs': path.resolve(__dirname, '../ractjs/dist/index.js')
        },
    },
    plugins: [vue()],
    build: {
        outDir: '../r1ader.github.io'
    }
})
