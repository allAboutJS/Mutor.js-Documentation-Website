import { menu, toHtml } from "../utils.js";

export function GET() {
  return {
    seo: {
      title: "Server Rendering | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/server-rendering",
    pager: {
      prev: {
        title: "Components & Layouts",
        path: "/docs/components-layouts"
      },
      next: {
        title: "Namespaces",
        path: "/docs/namespaces"
      }
    }
  }
}
