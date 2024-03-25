import { test, expect } from "bun:test";
import { isPlainObject } from "./is";

test(isPlainObject.name, () => {
  expect(isPlainObject(undefined)).toBe(false);
  expect(isPlainObject(null)).toBe(false);
  expect(isPlainObject(true)).toBe(false);
  expect(isPlainObject(1)).toBe(false);
  expect(isPlainObject("{}")).toBe(false);
  expect(isPlainObject([])).toBe(false);
  expect(isPlainObject([{}])).toBe(false);
  expect(isPlainObject(() => {})).toBe(false);
  expect(isPlainObject(/\./)).toBe(false);
  expect(isPlainObject(new Date())).toBe(false);

  expect(isPlainObject({})).toBe(true);
  expect(isPlainObject({ val: 1 })).toBe(true);
  expect(isPlainObject({ val: 1, arr: [1], obj: {} })).toBe(true);
});
