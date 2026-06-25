import { menu, toHtml } from "./utils";

export function GET() {
  return {
    seo: {
      title: "Getting Started | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs",
    pager: {
      next: {
        title: "Template Syntax",
        path: "/docs/syntax"
      }
    }
  }
}
