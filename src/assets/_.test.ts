import { test, expect } from "bun:test";
import { Assets } from "./_";

test(`${Assets.DIR}/ has correct folder name`, () => {
  expect(import.meta.dir.split("/").at(-1)).toBe(Assets.DIR);
});

test(`${Assets.DIR}/ matches correct URLs`, () => {
  expect(typeof Assets.match).toBe("function");
  expect(Assets.match(new URL("http://localhost:9999/assets/styles.css"))).toBe(
    "src/assets/styles.css",
  );
  expect(
    Assets.match(new URL("http://localhost:9999/assets/icons/favicon.svg")),
  ).toBe("src/assets/icons/favicon.svg");
  expect(
    Assets.match(new URL(`http://localhost:9999/assets/${import.meta.file}`)),
  ).toBeUndefined();
  expect(
    Assets.match(new URL("http://localhost:9999/styles.css")),
  ).toBeUndefined();
});

test(`${Assets.DIR}/ exposes all asset files except those with leading underscore`, () => {
  const include = "**/**.*";
  const scanned = new Bun.Glob(include).scanSync(`src/${Assets.DIR}`);

  for (const path of scanned) {
    const url = new URL(`http://localhost:9999/assets/${path}`);
    const asset = Assets.match(url);
    if (path.startsWith("_")) {
      expect(asset).toBeUndefined();
    } else {
      expect(asset).toBe(`src/assets/${path}`);
    }
  }

  expect.hasAssertions();
});

test(`${Assets.DIR}/ doesn't expose test or source files`, () => {
  const include = "**/**.{ts,tsx}";
  const scanned = new Bun.Glob(include).scanSync(`src/${Assets.DIR}`);

  for (const path of scanned) {
    const url = new URL(`http://localhost:9999/assets/${path}`);
    const asset = Assets.match(url);
    expect(asset).toBeUndefined();
  }

  expect.hasAssertions();
});
