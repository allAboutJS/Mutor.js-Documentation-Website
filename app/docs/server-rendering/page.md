# Server Rendering

The server entry point extends the core engine with file system access. Use it when your templates live on disk — Express servers, SSR pipelines, static site generators, or any Node.js environment where templates are files rather than registered strings.

```javascript
import Mutor from "mutorjs/server";
```

Everything in the core API is available. The server entry adds `renderFile`, `buildDir`, `compileDir`, and file-based layout loading on top.

## Setup

Instantiate with a `rootDir` pointing to the root of your views directory. This is used for top-level file resolution and enables the `@/` include alias.

```javascript
const mutor = new Mutor({
  rootDir: "./views",
});
```

`rootDir` is optional, omitting it defaults to the current working directory. `@/` includes are the recommended approach for shared partials. Relative includes are prone to breaking when files are moved.

> Avoid relative imports in layouts.

When `rootDir` is set, all includes are constrained to it. A template cannot include files outside the configured root.

This is especially important inside layout files. A layout is resolved
from its own path, not the path of the page that uses it. Relative
includes inside a layout will break for any page that lives at a
different directory depth. Always use `@/` inside layouts.

## Rendering a file

`renderFile` takes a file path and a context object and returns the rendered string synchronously.

```javascript
const html = mutor.renderFile("./views/pages/home.html", {
  title: "Home",
  user: { name: "Ada" },
});
```

The file is compiled on first access and cached by absolute path. Subsequent renders of the same file hit the cache and skip compilation.

## File includes

Inside file templates, `::include` resolves paths relative to the file currently being rendered:

```html
<!-- views/pages/home.html -->
\{{ ::include("../partials/header.html") }}

<h1>\{{ title }}</h1>

\{{ ::include("../partials/footer.html") }}
```

Use the `@/` alias to resolve from `rootDir` instead, regardless of where the current file lives:

```html
\{{ ::include("@/partials/header.html") }}
\{{ ::include("@/partials/footer.html") }}
```

## File-based layouts

Load layouts from disk using `addLayoutFromPath` or `addLayoutsInDir`. Each layout file must declare its name with `\{{# layout "name" }}` at the top.

### Loading a single layout

```javascript
mutor.addLayoutFromPath("./views/layouts/root.html");
```

```html
<!-- views/layouts/root.html -->
\{{# layout "root" }}
<!doctype html>
<html>
  <head><title>\{{ title }}</title></head>
  <body>
    \{{ ::slot }}
  </body>
</html>
```

### Loading all layouts in a directory

```javascript
await mutor.addLayoutsInDir("./views/layouts");
```

Mutor recursively scans the directory and registers every file that contains a `\{{# layout }}` directive. This is the recommended approach. Call it once at startup before handling any requests.

### Using a layout in a file template

Declare the layout at the top of the file:

```html
\{{# use "root" }}
<h1>\{{ title }}</h1>
<p>\{{ description }}</p>
```

Render it normally with `renderFile`. Mutor resolves the layout, injects the file content at `\{{ ::slot }}`, and returns the composed output.

## Building a directory

`buildDir` renders an entire directory of templates and writes the output to a destination directory. Non-template files are copied as-is.

```javascript
await mutor.buildDir("./site", "./dist", {
  title: "Mutor Site",
  year: 2025,
});
```

By default, `.html` and `.txt` files are treated as templates. Everything else is copied verbatim. `node_modules` and `.git` are always skipped.

The destination directory must not be the same as, or a child of, the source directory. Mutor enforces this and throws if the constraint is violated.

Layout files are used during the build but excluded from the output by default. Pass `true` as the fourth argument to keep them:

```javascript
await mutor.buildDir("./site", "./dist", context, true);
```

### Customizing which files are processed

Configure the `build` option to control which extensions are rendered and which paths are excluded:

```javascript
const mutor = new Mutor({
  rootDir: "./site",
  build: {
    include: new Set([".html", ".txt", ".xml"]),
    exclude: new Set(["node_modules", ".git", "drafts"]),
  },
});
```

## Compiling a directory

`compileDir` precompiles matching files into the cache without rendering them. Use it at startup to warm the cache before the first request, eliminating compilation overhead at runtime.

```javascript
await mutor.compileDir("./views");
```

When layout directives are found during compilation, those layouts are registered automatically. This means you can use `compileDir` in place of `addLayoutsInDir` when you want to warm the full cache in one pass.

## Cache management

The server renderer caches compiled templates by absolute file path. Entries are populated on first render or during `compileDir`.

Invalidate a specific file:

```javascript
mutor.invalidateTemplateCacheEntry("./views/pages/home.html");
```

Invalidate a layout:

```javascript
mutor.invalidateLayoutCacheEntry("./views/layouts/root.html");
```

The cache does not watch the filesystem. If a template file changes on disk, you are responsible for invalidating its cache entry. In development, calling `mutor.reset()` clears everything and restores default config.

Inspect current cache state:

```javascript
mutor.getDiagnostics();
```

## Using with Express

A typical Express integration loads layouts once at startup, then calls `renderFile` per request:

```javascript
import express from "express";
import Mutor from "mutorjs/server";

const app = express();
const mutor = new Mutor({ rootDir: "./views" });

await mutor.addLayoutsInDir("./views/layouts");

app.get("/", (req, res) => {
  const html = mutor.renderFile("./views/pages/home.html", {
    title: "Home",
    user: req.user,
  });

  res.send(html);
});
```

Because `renderFile` is synchronous, there is no need to await it. The compiled template is pulled from cache on every request after the first render.

---

**Using Mutor with an htmx application?** [Lynnix](https://lynnix.vercel.app) is a file-based hypermedia routing middleware built on Mutor's server renderer. It handles route resolution, fragment rendering, and per-route middleware so you can focus on templates. This very website is powered by Lynnix.
