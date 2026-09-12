import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      // tailwindcss() MUST come before tanstackStart()/nitro() — this is the
      // exact plugin the removed @lovable.dev preset was silently including,
      // and its absence caused Tailwind's CSS to build in a broken/unwrapped
      // form (missing proper @layer processing) that browsers couldn't apply.
      tailwindcss(),
      tanstackStart({
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
        importProtection: {
          behavior: "error",
          client: {
            files: ["**/server/**"],
            specifiers: ["server-only"],
          },
        },
      }),
      // No preset override here — let Nitro use its own native Vercel
      // output convention (.vercel/output) rather than the non-standard
      // 'dist' path the @lovable.dev preset forced, which produced valid
      // Vercel function artifacts but not at the path Vercel's build
      // system actually looks for, resulting in a 404 despite a "Ready" build.
      nitro({ preset: "vercel" }),
      viteReact(),
    ],
    server: {
      host: "0.0.0.0",
      port: 5000,
      allowedHosts: true,
    },
  };
});
