import { menu, toHtml } from "../utils.js";

export function GET() {
  return {
    seo: {
      title: "Namespaces | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/namespaces",
    pager: {
      prev: {
        title: "Server Rendering",
        path: "/docs/server-rendering"
      },
      next: {
        title: "Configuration",
        path: "/docs/configuration"
      }
    }
  }
}
