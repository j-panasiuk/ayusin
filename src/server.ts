const server = Bun.serve({
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
      return new Response(Bun.file("src/index.html"));
    }

    return new Response(null, { status: 404 });
  },
});

console.log("• started server on", server.url.href);
