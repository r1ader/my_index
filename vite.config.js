import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

export default defineConfig({
    resolve: {
        alias: {
            'r_animate': path.resolve(__dirname, '../r_animate')
        },
    },
    plugins: [vue()],
    build: {
        outDir: '../r1ader.github.io'
    }
})