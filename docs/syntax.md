# Syntax

Mutor expressions live inside `{{ ... }}` tags.

## Basic output

```html
<h1>{{ title }}</h1>
```

## Supported values and expressions

Mutor supports:

- strings
- numbers
- booleans
- `null`
- `undefined`
- property access with `.` and `[]`
- optional chaining with `?.`
- arithmetic and comparison operators
- `&&`, `||`, and `??`
- unary operators
- ternaries
- grouped expressions

Examples:

```html
{{ user.name }}
{{ user?.profile?.name }}
{{ user["name"] }}
{{ count + 1 }}
{{ score >= 80 }}
{{ admin && active }}
{{ name ?? "Anonymous" }}
{{ admin ? "Admin" : "Member" }}
```

## Control flow

Mutor also supports template control flow inside tags:

```html
{{ if user.admin }}
  <strong>{{ user.name }}</strong>
{{ else }}
  <span>{{ user.name }}</span>
{{ endif }}
```

```html
{{ for item of items }}
  <li>{{ item }}</li>
{{ endfor }}
```

## Comments and trimming

Comments are written with `#`:

```html
{{# This will not render }}
```

Whitespace can be trimmed with `~`:

```html
Hello {{~ name ~}} !
```

## Escaped tags

Prefix an opening tag with the escape delimiter when you want the tag itself to appear in output:

```html
\{{ name }}
```

That renders as:

```html
{{ name }}
```

## Not supported inside templates

Mutor does **not** allow JavaScript object literals, array literals, function literals, arrow functions, or constructors inside templates.

Pass data through the render context or use namespaces like `JSON::parse(...)` when needed.
