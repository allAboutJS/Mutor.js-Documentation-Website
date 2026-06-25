import { menu, toHtml } from "../utils";

export function GET() {
  return {
    seo: {
      title: "Components & Layouts | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/components-layouts",
    pager: {
      prev: {
        title: "Template Syntax",
        path: "/docs/syntax"
      },
      next: {
        title: "Server Rendering",
        path: "/docs/server-rendering"
      }
    }
  }
}
