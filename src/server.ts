import { Pages } from "./pages/_";

const server = Bun.serve({
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
console.table(Object.entries(Pages.router.routes).sort());
