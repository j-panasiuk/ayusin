import { Assets } from "./assets/_";
import { Pages } from "./pages/_";
import { Env } from "./utils/env";

export const server = Bun.serve({
  port: Env.isTest() ? 3301 : 3300,
  async fetch(req) {
    const route = Pages.router.match(req);
    if (route) {
      try {
        const { default: handle } = await import(route.filePath);
        return handle(req);
      } catch (err) {
        return new Response(null, { status: 500 });
      }
    }

    const url = new URL(req.url);
    const asset = Assets.match(url);
    if (asset) {
      try {
        if (req.method !== "GET") return new Response(null, { status: 405 });
        const file = Bun.file(asset);
        if (!(await file.exists())) return new Response(null, { status: 404 });
        return new Response(file);
      } catch (err) {
        return new Response(null, { status: 500 });
      }
    }

    return new Response(null, { status: 404 });
  },
});

console.log("• server running on", server.url.href);

if (Env.isDev()) console.table(Object.entries(Pages.router.routes).sort());
