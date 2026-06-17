# Interpolation

Interpolation writes values and expressions into the rendered output.

## Basic interpolation

```html
<h1>{{ title }}</h1>
<p>{{ user.name }}</p>
```

You can interpolate more than simple property access:

```html
{{ count + 1 }}
{{ user?.profile?.name }}
{{ admin ? "Admin" : "Member" }}
{{ name ?? "Anonymous" }}
```

## Escaping is on by default

Rendered values are HTML-escaped unless you disable `autoEscape`.

```javascript
mutor.render("{{ value }}", {
  value: "<strong>Hello</strong>",
});
// &lt;strong&gt;Hello&lt;/strong&gt;
```

## Rendering trusted HTML

When a value is already safe, you can mark it explicitly:

```html
{{ HTML::safe(trustedHtml) }}
```

Use this only for trusted content.

## Namespace values are allowed

Mutor supports trusted namespace calls inside interpolation:

```html
{{ Math::abs(-5) }}
{{ JSON::stringify(user) }}
{{ String::capitalize(name) }}
```

## What interpolation does not do

Interpolation does not evaluate arbitrary JavaScript source. Mutor parses the expression language itself and keeps templates constrained.
