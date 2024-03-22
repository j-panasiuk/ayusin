import { Pages } from "./pages/_";

export const server = Bun.serve({
  port: import.meta.env.NODE_ENV === "test" ? 3301 : 3300,
  async fetch(req) {
    const route = Pages.router.match(req);
    if (route) {
      try {
        const { default: page } = await import(route.filePath);
        // TODO test that it is a function
        return page(req);
      } catch (err) {
        return new Response(null, { status: 500 });
      }
    }

    return new Response(null, { status: 404 });
  },
});

console.log("• started server on", server.url.href);
if (import.meta.env.NODE_ENV === "development")
  console.table(Object.entries(Pages.router.routes).sort());
