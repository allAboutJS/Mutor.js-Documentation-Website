# Introduction

Mutor.js is a fast, synchronous templating engine for Node.js and the browser.

It focuses on a small template language with familiar JavaScript-like expressions, predictable rendering, HTML escaping by default, and practical composition features such as includes, registered components, and layouts.

## Why Mutor.js

Mutor v3 is designed around a few clear ideas:

- synchronous rendering for predictable control flow
- HTML escaping enabled by default
- includes and reusable components
- explicit layout composition through top-of-file directives
- server-side file rendering and directory builds
- function calls from context values disabled by default
- blocked access to dangerous properties such as `constructor`, `prototype`, and `__proto__`

## A quick example

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

const html = mutor.render("Hello, {{ user.name }}.", {
  user: { name: "Ada" },
});

console.log(html);
```

## What changed in v3

The README highlights these v3 changes:

- sync-only runtime and API surface
- official layout support via `{{# layout ... }}` and `{{# use ... }}`
- file-based layout loading for the server runtime
- improved file path resolution for `renderFile(...)` and includes
- stronger directory build guards
- expanded regression coverage for client and server behavior

## Core concepts

Mutor templates use `{{ ... }}` tags for output and control flow.

```html
<h1>{{ title }}</h1>
```

Common features include:

- interpolation: `{{ user.name }}`
- conditionals: `{{ if user.admin }}...{{ endif }}`
- loops: `{{ for item of items }}...{{ endfor }}`
- comments: `{{# hidden }}`
- whitespace trimming with `~`
- includes with `Mutor::include(...)`
- layouts with `{{# layout "name" }}` and `{{# use "name" }}`

## When to use it

Use Mutor when you want a template engine that stays constrained, keeps rendering simple, and works well for server-side HTML generation or precompiled templates.

For installation and first steps, continue with `installation.md` and `getting-started.md`.
