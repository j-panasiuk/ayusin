import { html } from "../utils/html";
import { Pages } from "./_";

const IndexPage: Pages.Page = (req) => {
  return new Response(Pages.render(html`<h1>Home Page</h1>`), {
    headers: { "Content-Type": "text/html" },
  });
};

export default IndexPage;
