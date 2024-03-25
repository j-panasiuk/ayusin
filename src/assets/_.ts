export namespace Assets {
  export type Path = `src/${typeof Assets.DIR}/${string}`;
  export type Link = `/${typeof Assets.DIR}/${string}`;

  export const DIR = "assets";

  export function match({ pathname }: URL): Assets.Path | undefined {
    if (pathname.startsWith(`/${Assets.DIR}/`) && !pathname.includes("/_")) {
      return `src${pathname as Assets.Link}`;
    }
  }
}
