# Escaping

Mutor escapes interpolated output by default.

## Default behavior

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

mutor.render("{{ value }}", {
  value: "<script>alert('nope')</script>",
});
// &lt;script&gt;alert(&#39;nope&#39;)&lt;/script&gt;
```

This default helps prevent accidental HTML injection in ordinary templating.

## Disable auto escaping

Disable escaping only when you know the output is already safe:

```javascript
const mutor = new Mutor({ autoEscape: false });
```

## Escape manually

Use the `HTML` namespace when you want explicit control:

```html
{{ HTML::escape(value) }}
```

## Mark trusted HTML as safe

```html
{{ HTML::safe(trustedHtml) }}
```

Use `HTML::safe(...)` only for trusted values.

## Escaping template tags themselves

If you want `{{ ... }}` to appear as text, escape the opening tag:

```html
\{{ name }}
```

That renders as:

```html
{{ name }}
```

The `preserveEscapeDelimiter` option controls whether escaped opening tags keep their escape marker.
