import { test, expect } from "bun:test";
import { PAGES, PAGE_EXTENSION } from "./_";

test(`${PAGES} folder - each page exports a request handler that returns HTML response`, async () => {
  const include = `**/**.${PAGE_EXTENSION}`;
  const scanned = new Bun.Glob(include).scanSync(`src/${PAGES}`);

  for (const path of scanned) {
    const module = await import(`./${path}`);

    expect(typeof module.default).toBe("function");
    expect(module.default.name).toEndWith("Page");

    const req = new Request(`http://localhost:9999/${path}`);
    const res = module.default(req);

    expect(res).toBeInstanceOf(Response);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toStartWith("text/html");
  }

  expect.hasAssertions();
});
