import { test, expect } from "bun:test";
import { Pages } from "./_";

test(`${Pages.DIR} - each page exports request handler that returns HTML response`, async () => {
  const include = `**/**.${Pages.EXT}`;
  const scanned = new Bun.Glob(include).scanSync(`src/${Pages.DIR}`);

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

test(`${Pages.DIR} - doesn't contain any ".test.ts" files`, async () => {
  const include = "**/**.test.ts";
  const scanned = new Bun.Glob(include).scanSync(`src/${Pages.DIR}`);

  for (const path of scanned) {
    throw new Error(
      `Found a test file with disallowed extension: ${path}

      NOTE: ${Pages.DIR} folder shouldn't include files with '.test.ts' extension.
      This is to prevent test files to be accidentally matched as regular pages.

      Use '.test.tsx' extenstion instead.

      NOTE: this is a temporary workaround due to limitations of Bun's FileSystemRouter.
      @see https://github.com/oven-sh/bun/issues/5822
      @see https://github.com/oven-sh/bun/issues/7210
      `,
    );
  }

  expect.assertions(0);
});
