import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // vite가  이 서버 폴더 아래에 있는 모든 파일들을 감지하지 않게 됨
  server: {
    watch: {
      ignored: ["**/server/**"],
    },
  },
});
  