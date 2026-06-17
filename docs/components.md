# Components

Components in Mutor are reusable registered templates.

You register them in memory, then render them directly or include them from other templates.

## Register a component

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

mutor.registerComponent("card", `
<article>
  <h2>{{ title }}</h2>
  <p>{{ body }}</p>
</article>
`);
```

## Render a component

```javascript
const html = mutor.renderComponent("card", {
  title: "Hello",
  body: "Reusable content",
});
```

## Compose components with includes

```javascript
mutor.registerComponent("shell", `
<!doctype html>
<html>
  <body>
    {{ Mutor::include("nav") }}
    <main>{{ content }}</main>
  </body>
</html>
`);
```

Then render the parent component:

```javascript
const page = mutor.render('{{ Mutor::include("shell") }}', {
  content: "<h1>Welcome</h1>",
  nav: [
    { href: "/", label: "Home" },
    { href: "/settings", label: "Settings" },
  ],
});
```

## Notes

- registered components are addressed by identifier
- includes inherit the current context unless you pass another one
- the current context is always available as `Mutor::$$context`

Use components for repeated fragments, shells, and small pieces of shared UI.
