import type { Pages } from "./_";

const IndexPage: Pages.Page = (req) => {
  return new Response(
    /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Welcome</h1>
  </body>
</html>
  `,
    { headers: { "Content-Type": "text/html" } },
  );
};

export default IndexPage;
