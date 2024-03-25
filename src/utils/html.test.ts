import { expect, test } from "bun:test";
import { html } from "./html";

test(html.name, () => {
  expect(html``).toBe("");
  expect(html`${undefined}`).toBe("");
  expect(html`${null}`).toBe("");
  expect(html`<div>${5}</div>`).toBe("<div>5</div>");
  expect(html`<div>${" A "}</div>`).toBe("<div> A </div>");
  expect(html`<div>${["<input />", "<input />"]}</div>`).toBe(
    "<div><input /><input /></div>",
  );
  expect(html`<div>${html`<input value=${5} />`}</div>`).toBe(
    "<div><input value=5 /></div>",
  );
  expect(given).toBe(expected);
});

const given = html`
  <div>
    <h1>Title</h1>
    <h2>Subtitle</h2>
  </div>
  <div>${["Content", "中文", "🦄"].join(" ")}</div>
  <textarea rows=${5} placeholder="${"中文 🦄"}"></textarea>
`;

const expected = `
<div>
<h1>Title</h1>
<h2>Subtitle</h2>
</div>
<div>Content 中文 🦄</div>
<textarea rows=5 placeholder="中文 🦄"></textarea>
`;
