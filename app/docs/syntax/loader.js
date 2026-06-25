import { menu, toHtml } from "../utils";

export function GET() {
  return {
    seo: {
      title: "Template Syntax | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/syntax",
    pager: {
      prev: {
        title: "Getting Started",
        path: "/docs"
      },
      next: {
        title: "Components & Layouts",
        path: "/docs/components-layouts"
      }
    }
  }
}
