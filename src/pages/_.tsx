export const PAGES = "pages";
export const PAGE_EXTENSION = "ts";

export namespace Pages {
  export type Page = (req: Request) => Response;

  export const router = new Bun.FileSystemRouter({
    dir: `src/${PAGES}`,
    fileExtensions: [`.${PAGE_EXTENSION}`],
    style: "nextjs",
  });
}
