import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { pigment } from "@pigment-css/vite-plugin";

export default defineConfig({
  plugins: [
    pigment({
      theme: {
        colors: {
          brand: {
            50: "#eef2ff",
            100: "#dbe4ff",
            200: "#bfcfff",
            500: "#3c71ff",
            600: "#2558e6",
            700: "#1a44cc",
          },
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
});
