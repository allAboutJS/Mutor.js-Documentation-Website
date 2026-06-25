import { menu, toHtml } from "../utils.js";

export function GET() {
  return {
    seo: {
      title: "CLI Reference | Mutor.js Docs",
      description: "",
      image: ""
    },
    menu,
    toHtml,
    pathname: "/docs/cli",
    pager: {
      prev: {
        title: "API Reference",
        path: "/docs/api"
      },
      next: {
        title: "Security",
        path: "/docs/security"
      }
    }
  }
}
