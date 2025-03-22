import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(
        new URL("./src/components/GoogleLogin.vue", import.meta.url)
      ),
      name: "Vue3GoogleLogin", // Exported library name
      fileName: (format) => `vue3-google-login.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
