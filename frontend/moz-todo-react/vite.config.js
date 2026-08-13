import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // rechartsを事前最適化（または最適化から除外）してパス解決のバグを回避します
    exclude: ["recharts"],
  },
  resolve: {
    // 省略された拡張子をViteに強制的に検索させる設定です
    extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
  },
});
