# Getting Started

Mutor.js is a fast, synchronous template engine for Node.js and the browser. It compiles templates to an AST and evaluates them against a plain JavaScript context object, no async complexity, no full runtime exposure.

The template language is intentionally constrained: familiar enough to read at a glance, but limited enough that templates stay templates. You cannot define functions, construct objects, or execute arbitrary JavaScript inside a `\{{ }}` tag. What you can do is interpolate values, iterate over data, branch on conditions, compose layouts, and call trusted namespace helpers.

## Installation

```bash
npm install mutorjs
```

```bash
yarn add mutorjs
```

```bash
pnpm add mutorjs
```

Mutor is written in TypeScript and ships with types included. No `@types/` package is needed.

## Entry points

Mutor ships two entry points depending on where you are rendering.

**`mutorjs`** is the core engine. Works in Node.js and the browser. Supports `render`, `compile`, registered components, and in-memory layouts.

```javascript
import Mutor from "mutorjs";
```

**`mutorjs/server`** extends the core with file system access. Use this when your templates live on disk. Adds `renderFile`, `buildDir`, `compileDir`, and file-based layout loading.

```javascript
import Mutor from "mutorjs/server";
```

If you are running in a browser environment or bundling templates at build time, import from `mutorjs`. If you are running an Express server, an SSR pipeline, or a static site build, import from `mutorjs/server`.

There is also a CDN version for use on the browser via the script tag.

```html
<script src="https://cdn.jsdelivr.net/npm/mutorjs@3.0.3/dist/mutor.global.min.js"></script>

<script>
const mutor = new Mutor();

const rendered = mutor.render("Hello, {{ name }}!", { name: "Victor Onah" });
console.log(rendered); // Hello, Victor Onah!
</script>
```

## Your first render

Instantiate the engine and call `render` with a template string and a context object.

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

const html = mutor.render("Hello, \{{ user.name }}.", {
  user: { name: "Ada" },
});

console.log(html); // Hello, Ada.
```

The context object is plain JavaScript. There is nothing to declare or register. Any property on the object is accessible from the template by name.

## Escaping

Output is HTML-escaped by default. This means values like `<script>` are written as `&lt;script&gt;` in the rendered output.

```javascript
mutor.render("\{{ value }}", {
  value: "<script>alert('nope')</script>",
});
// &lt;script&gt;alert(&#39;nope&#39;)&lt;/script&gt;
```

This behavior is on by default and you should leave it on. If you are working with a context where escaping is unnecessary — rendering plain text, or outputting pre-sanitized content — you can disable it at instantiation:

```javascript
const mutor = new Mutor({ autoEscape: false });
```

To render a trusted HTML string inside an otherwise escaped template, use `HTML::safe`:

```javascript
mutor.render("\{{ HTML::safe(body) }}", {
  body: "<p>This is <strong>trusted</strong> content.</p>",
});
```

Only pass values you fully control to `HTML::safe`. It bypasses all escaping.

## Conditionals

```javascript
const template = `
\{{ if user.admin }}
<strong>\{{ user.name }}</strong>
\{{ else if user.active }}
<span>\{{ user.name }}</span>
\{{ else }}
  <em>Inactive user</em>
\{{ endif }}
`;

const html = mutor.render(template, {
  user: { name: "Grace", admin: true },
});
```

## Loops

```javascript
const template = `
<ul>
  \{{ for item of items }}
  <li>\{{ item.name }}</li>
  \{{ endfor }}
</ul>
`;

const html = mutor.render(template, {
  items: [
    { name: "Apples" },
    { name: "Oranges" },
    { name: "Mangoes" },
  ],
});
```

## Rendering a file

When templates are on disk, import from `mutorjs/server` and use `renderFile`. Set `rootDir` to the root of your views directory.

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({
  rootDir: "./views",
});

const html = mutor.renderFile("pages/home.html", {
  title: "Home",
  user: { name: "Ada" },
});
```

File includes inside templates resolve relative to the file being rendered, or from `rootDir` using the `@/` alias. The `@/` is best used within [layout](/docs/layouts) templates for correct import resolution.

```html
<!-- views/pages/home.html -->
\{{ Mutor::include("@/partials/header.html") }}

<h1>\{{ title }}</h1>
```
