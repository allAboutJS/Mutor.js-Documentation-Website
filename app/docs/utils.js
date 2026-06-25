import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({ html: true });

export const menu = [
  { title: "Getting Started", path: "/docs" },
  { title: "Template Syntax", path: "/docs/syntax" },
  { title: "Components & Layouts", path: "/docs/components-layouts" },
  { title: "Server Rendering", path: "/docs/server-rendering" },
  { title: "Namespaces", path: "/docs/namespaces" },
  { title: "Configuration", path: "/docs/configuration" },
  { title: "API Reference", path: "/docs/api" },
  { title: "CLI Reference", path: "/docs/cli" },
  { title: "Security", path: "/docs/security" },
  // { title: "Usage", path: "/docs/usage" },
]

export const toHtml = (src) => {
  const transformed = markdown.render(src);
  return transformed
}
