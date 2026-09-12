import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
  nitro: { preset: "vercel" },
  vite: {
    server: {
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
    },
  },
});
