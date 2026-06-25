import { menu, toHtml } from "../utils.js";

export function GET() {
  return {
    seo: {
      title: "Configuration | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/configuration",
    pager: {
      prev: {
        title: "Namespaces",
        path: "/docs/namespaces"
      },
      next: {
        title: "Configuration",
        path: "/docs/configuration"
      }
    }
  }
}
