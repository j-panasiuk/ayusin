const PAGES = "pages";
const PAGE_EXTENSION = "tsx";

export namespace Pages {
  export type Page = (req: Request) => Response;

  export const router = new Bun.FileSystemRouter({
    dir: `src/${PAGES}`,
    fileExtensions: [`.${PAGE_EXTENSION}`],
    style: "nextjs",
  });
}
