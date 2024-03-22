import { test, expect, afterAll } from "bun:test";
import { server } from "./server";

test("server responds with 404 to unrecognized request path", async () => {
  const res = await server.fetch("/bad/path");
  expect(res.status).toBe(404);
  expect.hasAssertions();
});

test("server responds with 200 to / (index) request path", async () => {
  const res = await server.fetch("/");
  expect(res.status).toBe(200);
  expect.hasAssertions();
});

afterAll(() => {
  server.stop();
  console.log("• server stopped.");
});
