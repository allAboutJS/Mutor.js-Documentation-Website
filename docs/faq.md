# FAQ

## Is Mutor synchronous?

Yes. Mutor is a synchronous templating engine, and the README calls out a sync-only runtime and API surface for v3.

## Are interpolated values escaped by default?

Yes. Mutor escapes interpolated output by default.

```javascript
const mutor = new Mutor({ autoEscape: true });
```

## Can templates call functions from my context?

Not by default. Function calls from context values are disabled unless you enable `allowFnCalls`.

Namespace calls such as `Math::abs(...)` or `JSON::stringify(...)` are still allowed.

## Do includes inherit the current context?

Yes. If you omit the second argument, `Mutor::include(...)` uses the parent context.

```html
{{ Mutor::include("profile-card") }}
```

Pass another value when needed:

```html
{{ Mutor::include("profile-card", user) }}
```

## How do I inspect the current context?

Use `Mutor::$$context` or the shorthand `::$$context`.

```html
<pre>{{ JSON::stringify(Mutor::$$context, 2) }}</pre>
```

## Are arrays and objects supported directly in template source?

No. Array literals, object literals, function literals, arrow functions, and constructors are not part of the template language.

Pass structured data through the render context or use helpers such as `JSON::parse(...)`.

## How do layouts work in v3?

Layouts use top-of-file directives:

- `{{# layout "name" }}` declares a layout
- `{{# use "name" }}` applies a layout
- `{{ ::slot }}` renders child content inside the layout

## What happens when an include fails?

That depends on configuration. Missing includes can throw, return empty output, log, or use `onIncludeError`.

## Is Mutor a full security sandbox or HTML sanitizer?

No. Mutor keeps templates constrained and escapes output by default, but it does not claim to be a complete sandbox for hostile code or a full HTML sanitization system.
