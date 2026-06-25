# Includes

Includes let you render another template from the current template.

In Mutor, includes are called through `Mutor::include(...)`.

## Include a registered template

If no context is passed, the include inherits the parent context:

```html
{{ Mutor::include("profile-card") }}
```

Pass a different context when the partial should render against another value:

```html
{{ Mutor::include("profile-card", user) }}
```

## Example with registered components

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

mutor.registerComponent("nav", `
<nav>
  {{ for item of nav }}
    <a href="{{ item.href }}">{{ item.label }}</a>
  {{ endfor }}
</nav>
`);

const html = mutor.render(`{{ Mutor::include("nav") }}`, {
  nav: [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
  ],
});
```

## File includes on the server

When using `mutorjs/server`, file includes resolve relative to the file currently being rendered:

```html
{{ Mutor::include("../partials/header.html") }}
```

Use `@/` to resolve from `rootDir`:

```html
{{ Mutor::include("@/partials/header.html") }}
```

When `rootDir` is set, includes are constrained to that directory.

## Include failures

Missing includes can throw, return empty output, log, or use `onIncludeError`, depending on your config.
