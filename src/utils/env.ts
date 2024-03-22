export namespace Env {
  export const isDev = () => import.meta.env.NODE_ENV === "development";
  export const isTest = () => import.meta.env.NODE_ENV === "test";
  export const isProd = () => import.meta.env.NODE_ENV === "production";
}
