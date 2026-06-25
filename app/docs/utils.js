import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({ html: true });
// const htmlMap = new Map();

export const menu = [
  { title: "Getting Started", path: "/docs" },
  { title: "Template Syntax", path: "/docs/syntax" },
  { title: "Components & Layouts", path: "/docs/components-layouts" },
  { title: "Server Rendering", path: "/docs/server-rendering" },
  { title: "Namespaces", path: "/docs/namesapces" },
  { title: "Configuration", path: "/docs/configuration" },
  { title: "API Reference", path: "/docs/api" },
  { title: "CLI", path: "/docs/cli" },
  { title: "Security", path: "/docs/security" },
  { title: "Usage", path: "/docs/usage" },
]

export const toHtml = (path, src) => {
  // if (htmlMap.has(path)) {
  //   return htmlMap.get(path);
  // }

  const transformed = markdown.render(src);

  // htmlMap.set(path, transformed);
  return transformed
}
