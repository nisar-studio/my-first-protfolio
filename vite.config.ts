import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Allowed preview hosts are supplied by the environment so no VM hostname is
// committed to source.
const extraHosts = (process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: extraHosts.length > 0 ? extraHosts : undefined,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
  },
});
