# Layouts

Mutor v3 supports layouts through top-of-file directives.

This metadata-style syntax is intentional: layouts must be declared at the top of the template.

## Declare a layout

Register a layout in memory with `addLayout(...)` and declare it with `{{# layout ... }}`:

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

mutor.addLayout(`
{{# layout "shell" }}
<html>
  <body>
    {{ ::slot }}
  </body>
</html>
`);
```

## Use a layout

Apply a layout with `{{# use ... }}` at the top of the child template:

```javascript
mutor.registerComponent("page", `
{{# use "shell" }}
<h1>{{ title }}</h1>
`);

mutor.renderComponent("page", { title: "Dashboard" });
```

## Render child content with `::slot`

The layout renders its child content where `{{ ::slot }}` appears:

```html
<main>{{ ::slot }}</main>
```

## Nested layouts

Layouts can use other layouts:

```javascript
mutor.addLayout(`
{{# layout "outer" }}
<outer>{{ ::slot }}</outer>
`);

mutor.addLayout(`
{{# layout "inner" }}
{{# use "outer" }}
<inner>{{ ::slot }}</inner>
`);
```

## File-based layouts on the server

With `mutorjs/server`, you can register layouts from files or directories:

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({ rootDir: "./views" });

mutor.addLayoutFromPath("./views/layouts/root.html");
await mutor.addLayoutsInDir("./views/layouts");
```

## Layout rules

- `{{# layout "name" }}` declares a layout template
- `{{# use "name" }}` applies a layout
- `{{ ::slot }}` renders the child content
- directives must appear at the top of the template
- missing layouts throw an error
- circular layout dependencies are rejected
