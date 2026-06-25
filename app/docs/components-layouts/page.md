# Components & Layouts

Mutor provides two complementary composition mechanisms: components for reusable template fragments, and layouts for page-level shell wrapping. Both are registered by name and resolved at render time.

## Components

A component is a named template string you register once and include anywhere. Components are the primary way to share markup across templates without duplicating it.

### Registering a component

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

mutor.registerComponent("card", `
<article>
  <h2>\{{ title }}</h2>
  <p>\{{ body }}</p>
</article>
`);
```

### Rendering a component directly

```javascript
const html = mutor.renderComponent("card", {
  title: "Hello",
  body: "This is a card.",
});
```

### Including a component inside a template

Use `Mutor::include` to pull a component into another template:

```html
\{{ Mutor::include("card") }}
```

The `::` shorthand works too:

```html
\{{ ::include("card") }}
```

### Context inheritance

When no context is passed to an include, the component inherits the parent context in full:

```html
\{{# parent template rendered with { title, body, user } }}
\{{ Mutor::include("card") }}
\{{# card can access title, body, and user }}
```

### Passing a specific context

Pass a second argument to render the component against a different value:

```html
\{{ Mutor::include("profile-card", user) }}
```

The second argument is any expression valid in Mutor — typically a nested object from the current context. The included component receives that value as its entire context.

### Composing components

Components can include other components. The full context chain is inherited at each level unless explicitly overridden.

```javascript
mutor.registerComponent("nav", `
<nav>
  \{{ for item of nav }}
  <a href="\{{ item.href }}">\{{ item.label }}</a>
  \{{ endfor }}
</nav>
`);

mutor.registerComponent("shell", `
<!doctype html>
<html>
  <body>
    \{{ Mutor::include("nav") }}
    <main>\{{ content }}</main>
  </body>
</html>
`);

const html = mutor.render('\{{ Mutor::include("shell") }}', {
  content: "<h1>Welcome</h1>",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ],
});
```

### Inspecting the current context

The full context object is available at any point via `Mutor::$$context` or the `::$$context` shorthand:

```html
<pre>\{{ JSON::stringify(::$$context, 2) }}</pre>
```

This is useful during development when you want to see exactly what a component is receiving.

### Failed includes

By default, a missing component throws an error. You can change this behavior with `onIncludeFail`:

```javascript
const mutor = new Mutor({
  onIncludeFail: "empty",   // render nothing
  // onIncludeFail: "throw" // default
  // onIncludeFail: "log"   // log and render nothing
});
```

For dynamic fallback content, use `onIncludeError`:

```javascript
const mutor = new Mutor({
  onIncludeError: (identifier, error) => `<!-- missing: ${identifier} -->`,
});
```

## Layouts

Layouts wrap a child template inside a shell — typically an outer HTML structure, a `<head>`, navigation, or a footer. Mutor v3 implements layouts through top-of-file directives, which makes the relationship between a template and its layout explicit and statically analyzable.

### How layouts work

A layout is a template that declares its own name with `\{{# layout "name" }}` and marks where child content should be injected with `\{{ ::slot }}`.

A page template declares which layout it uses with `\{{# use "name" }}`. When rendered, Mutor wraps the page content inside the layout at the `\{{ ::slot }}` position.

Both directives must appear at the very top of the template — before any other content. This is intentional. Layout relationships are metadata, not runtime logic.

### Defining a layout

```javascript
mutor.registerLayout(`
\{{# layout "root" }}
<!doctype html>
<html>
  <head>
    <title>\{{ title }}</title>
  </head>
  <body>
    \{{ ::slot }}
  </body>
</html>
`);
```

### Using a layout in a component

```javascript
mutor.registerComponent("home", `
\{{# use "root" }}
<h1>\{{ title }}</h1>
<p>\{{ description }}</p>
`);

const html = mutor.renderComponent("home", {
  title: "Welcome",
  description: "This is the home page.",
});
```

The rendered output wraps the `home` content inside the `root` layout:

```html
<!doctype html>
<html>
  <head>
    <title>Welcome</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is the home page.</p>
  </body>
</html>
```

The layout and the child template share the same context. `\{{ title }}` resolves correctly in both.

### Nested layouts

Layouts can extend other layouts. A layout uses `\{{# use "name" }}` exactly like a page template does.

```javascript
mutor.registerLayout(`
\{{# layout "root" }}
<html><body>\{{ ::slot }}</body></html>
`);

mutor.registerLayout(`
\{{# layout "page" }}
\{{# use "root" }}
<div class="page">\{{ ::slot }}</div>
`);

mutor.registerComponent("article", `
\{{# use "page" }}
<article>\{{ content }}</article>
`);
```

Rendering `article` produces:

```html
<html><body><div class="page"><article>...</article></div></body></html>
```

Mutor resolves the full chain and rejects circular dependencies at registration time.

### Layout rules

- `\{{# layout "name" }}` declares a layout. Must be the very first content of the template.
- `\{{# use "name" }}` applies a layout to a template or another layout. Must appear at the top, but after a layout declaration if any.
- `\{{ ::slot }}` marks where child content is injected. A layout with no `\{{ ::slot }}` discards child content.
- Directives are not expressions, they cannot be conditional or dynamic.
- Missing layouts throw an error.
- Circular layout chains are rejected.

## File-based layouts

When using `mutorjs/server`, layouts can be loaded directly from disk rather than registered manually.

### Load a single layout file

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({ rootDir: "./views" });

mutor.addLayoutFromPath("./views/layouts/root.html");
```

The layout file must declare its name with `\{{# layout "name" }}` at the top.

### Load all layouts in a directory

```javascript
await mutor.addLayoutsInDir("./views/layouts");
```

Mutor recursively scans the directory, registers every file that contains a `\{{# layout }}` directive, and skips everything else. This is the recommended approach when you have more than one layout. By default Mutor will scan only `.html` and `.txt` files. To allow scanning of other extensions you can specify them by setting the `build.include` option. Mutor also excludes the `node_modules` directory and the `.gitignore` file by default. To specify what directories or extensions to exclude, set the `build.exclude` option in the config. You can override the `build.include` default extensions, but you cannot override the default `build.exclude` (`node_modules`, `.gitignore`).

### Using layouts in file templates

Once layouts are loaded, any file template can reference them with `\{{# use "name" }}`:

```html
\{{# use "root" }}
<h1>\{{ title }}</h1>
```

Render the file normally:

```javascript
const html = mutor.renderFile("./views/pages/home.html", { title: "Home" });
```

Mutor resolves the layout, injects the file content at `\{{ ::slot }}`, and returns the composed output.

### Layout files in build output

When you run `buildDir`, layout files are used during rendering but excluded from the output directory by default. To keep them in the output, pass the `keepLayoutFiles` flag:

```javascript
await mutor.buildDir("./views", "./dist", context, true);
```
