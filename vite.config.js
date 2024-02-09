import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from '@vitejs/plugin-vue'
import RadixVueResolver from "radix-vue/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
   vue(),
   Components({
   dts: true,
   dirs: ["./src/components","./src/layouts"],
   resolvers: [RadixVueResolver()],
  }),
  AutoImport({
   dts: true,
   dirs: [
       "./src/composables",
       "./src/utils",
       "./src/stores",
   ],
   imports:['vue','pinia']
  })
],
resolve: {
   alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
   },
},
})
