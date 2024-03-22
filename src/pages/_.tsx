import { html } from "../utils/html";

export namespace Pages {
  export const DIR = "pages";
  export const EXT = "ts";

  export type Page = (req: Request) => Response;

  export const router = new Bun.FileSystemRouter({
    dir: `src/${DIR}`,
    fileExtensions: [`.${EXT}`],
    style: "nextjs",
  });

  export const render = (content: string): string => {
    return html`<!DOCTYPE html>
      <html lang="en">
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ayusin</title>
        ${content}
      </html>`;
  };
}
