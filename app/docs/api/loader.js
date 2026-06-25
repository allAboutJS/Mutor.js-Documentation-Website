import { menu, toHtml } from "../utils.js";

export function GET() {
  return {
    seo: {
      title: "API Reference | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/api",
    pager: {
      prev: {
        title: "Configuration",
        path: "/docs/configuration"
      },
      next: {
        title: "CLI Reference",
        path: "/docs/cli"
      }
    }
  }
}
