import { defineConfig } from 'vite'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
   vue(),
   Components({
   dts: true,
   dirs: ["./src/components","./src/layouts"],
  }),
  AutoImport({
   dts: true,
   dirs: [
       "./src/composables",
       "./src/utils",
   ],
   imports:['vue']
  })
],
})
