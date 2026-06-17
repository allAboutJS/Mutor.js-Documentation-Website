# Getting Started

This page walks through the smallest useful Mutor v3 setup.

## 1. Create an instance

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();
```

## 2. Render a template string

```javascript
const template = `
{{ if user.admin }}
  <strong>{{ user.name }}</strong>
{{ else }}
  <span>{{ user.name }}</span>
{{ endif }}
`;

const html = mutor.render(template, {
  user: { name: "Grace", admin: true },
});
```

## 3. Know the default escaping behavior

Interpolated values are escaped before they are written.

```javascript
mutor.render("{{ value }}", {
  value: "<script>alert('nope')</script>",
});
// &lt;script&gt;alert(&#39;nope&#39;)&lt;/script&gt;
```

Disable auto escaping only when you know the output is already safe:

```javascript
const mutor = new Mutor({ autoEscape: false });
```

## 4. Use includes or components when templates grow

```javascript
mutor.registerComponent("nav", `
<nav>
  {{ for item of nav }}
    <a href="{{ item.href }}">{{ item.label }}</a>
  {{ endfor }}
</nav>
`);

const page = mutor.render(`{{ Mutor::include("nav") }}`, {
  nav: [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
  ],
});
```

## 5. Render files on the server

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({ rootDir: "./views" });

const html = mutor.renderFile("./pages/home.html", {
  title: "Home",
});
```

## Good defaults to remember

- rendering is synchronous
- HTML escaping is enabled by default
- function calls from context values are disabled by default
- layout directives must appear at the top of the template

From here, the most useful pages are `syntax.md`, `interpolation.md`, and `layouts.md`.
