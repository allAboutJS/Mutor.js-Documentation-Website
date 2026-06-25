# Template Syntax

Mutor expressions live inside `\{{ }}` delimiters. Everything outside a tag is written to the output as-is. Everything inside is evaluated against the current context object.

```html
<h1>\{{ title }}</h1>
<p>Welcome, \{{ user.name }}.</p>
```

## Comments

Use `#` as the first character inside a tag to write a comment. Comments are removed from the rendered output entirely.

```html
\{{# This will not appear in the output }}
```

Comment syntax is fixed to `#` and is not configurable.

## Whitespace control

By default, Mutor preserves all whitespace around tags. Use `~` adjacent to a delimiter to trim whitespace on that side.

Trim both sides:

```html
Hello \{{~ name ~}}!
```

Trim only the left side:

```html
Hello \{{~ name }}!
```

Trim only the right side:

```html
Hello \{{ name ~}}!
```

This is useful when tags are on their own lines and you want to collapse the resulting blank lines in the output. You can also apply whitespace control to comments on either sides of the template.

```html
\{{~# This comment is right-trimmed }} 
\{{# This comment is left-trimmed ~}}
\{{~# This comment is trimmed ~}}
```

## Escaped tags

Prefix the opening delimiter with `\` to prevent a tag from being evaluated. The tag is written to the output as literal text.

```html
\ {{~ ~}} \{{ name }}
```

Renders as:

```html
\{{ name }}
```

This is useful in documentation templates, code examples, or anywhere you need to show Mutor syntax in the output itself.

By default, the escape marker (`\`) is stripped from the output. Set `preserveEscapeDelimiter: true` in config if you want to keep it.

## Values and expressions

Mutor supports a subset of JavaScript expressions inside tags. The language is intentionally limited — templates evaluate data, they do not execute logic.

### Primitives

Strings, numbers, booleans, `null`, and `undefined` are all valid:

```html
\{{ "hello" }}
\{{ 42 }}
\{{ true }}
\{{ null }}
```

### Property access

Access nested properties with dot notation, bracket notation, or optional chaining:

```html
\{{ user.name }}
\{{ user["name"] }}
\{{ user?.profile?.bio }}
```

Optional chaining short-circuits silently if a property in the chain is `null` or `undefined`, producing no output rather than throwing.

### Arithmetic

```html
\{{ count + 1 }}
\{{ price * quantity }}
\{{ total - discount }}
\{{ size / 2 }}
\{{ index % 2 }}
```

### Comparison

```html
\{{ score >= 80 }}
\{{ age == 18 }}
\{{ status != "inactive" }}
```

### Logical operators

```html
\{{ admin && active }}
\{{ isGuest || isAdmin }}
\{{ name ?? "Anonymous" }}
```

The nullish coalescing operator `??` returns the right-hand value when the left is `null` or `undefined`. It is the idiomatic way to provide fallback values in templates.

### Unary operators

```html
\{{ !isHidden }}
\{{ -offset }}
```

### Ternaries

```html
\{{ admin ? "Admin" : "Member" }}
\{{ count > 0 ? count : "none" }}
```

### Grouped expressions

Use parentheses to control evaluation order:

```html
\{{ (a + b) * c }}
\{{ (user.age >= 18) ? "adult" : "minor" }}
```

## What is not allowed

Mutor does not support the following inside template expressions:

- Object literals — `{ key: value }`
- Array literals — `[1, 2, 3]`
- Function expressions or arrow functions — `() => {}`
- `new` expressions
- Template literals
- `typeof`, `instanceof`, `in`, `void`, `delete`
- Assignment operators

If you need arrays or objects, pass them through the context object. If you need to construct a value dynamically, do it in your application code before rendering.

```javascript
// Pass structured data through context instead
mutor.render("\{{ for item of items }}\{{ item }}\{{ endfor }}", {
  items: [1, 2, 3],
});
```

## Conditionals

Use `if`, `else if`, `else`, and `endif` to branch on values.

```html
\{{ if user.admin }}
  <strong>\{{ user.name }}</strong>
  \{{ else if user.active }}
  <span>\{{ user.name }}</span>
  \{{ else }}
  <em>Inactive user</em>
\{{ endif }}
```

Conditions accept any expression. The templates are compiled to JavaScript so you can expect the conditions to work as it would with normal JavaScript. `0`, `""`, `null`, `undefined`, and `false` are all falsy.

```html
\{{ if items.length }}
  <p>\{{ items.length }} results</p>
  \{{ else }}
  <p>No results.</p>
\{{ endif }}
```

## Loops

### Arrays — `of`

Use `for ... of` to iterate over arrays and other iterables:

```html
\{{ for item of items }}
  <li>\{{ item.name }}</li>
\{{ endfor }}
```

Bind the index as a second variable:

```html
\{{ for item, index of items }}
  <li>\{{ index }}: \{{ item.name }}</li>
\{{ endfor }}
```

### Objects — `in`

Use `for ... in` to iterate over an object's keys:

```html
\{{ for key in user }}
  <p>\{{ key }}</p>
\{{ endfor }}
```

Bind the value alongside the key:

```html
\{{ for key, value in user }}
  <p>\{{ key }}: \{{ value }}</p>
\{{ endfor }}
```

### `break` and `continue`

Both are available inside loops:

```html
\{{ for item of items }}
  \{{ if item.hidden }}\{{ continue }}\{{ endif }}
  <li>\{{ item.name }}</li>
  \{{ if item.last }}\{{ break }}\{{ endif }}
\{{ endfor }}
```

Given `items = [1, 2, 3, 4]` with a `continue` on `2` and a `break` on `3`:

```txt
1
3
```

`break` exits the loop immediately. `continue` skips the rest of the current iteration and moves to the next.

## HTML escaping

All interpolated values are HTML-escaped by default. This protects against XSS when rendering user-supplied content.

```html
\{{ comment }}
```

If `comment` is `<script>alert('xss')</script>`, the output is:

```html
&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;
```

To render a trusted HTML value without escaping, use `HTML::safe`:

```html
\{{ HTML::safe(trustedBody) }}
```

Only use `HTML::safe` for values you fully control. Mutor does not perform context-sensitive sanitization — that remains the caller's responsibility.

To disable escaping globally:

```javascript
const mutor = new Mutor({ autoEscape: false });
```

## Custom delimiters

The default delimiters are `\{{` and `}}`. You can change them in config:

```javascript
const mutor = new Mutor({
  delimiters: {
    openingTag: "<%",
    closingTag: "%>",
    openingTagEscape: "\\",
    whitespaceTrim: "-",
  },
});
```

## Mutor namespace shorthand

Mutor-specific namespace members can be referenced with `::` directly, without the `Mutor::` prefix.

```html
\{{ ::include("card") }}
\{{ ::$$context }}
```

These are exactly equivalent to their full forms:

```html
\{{ Mutor::include("card") }}
\{{ Mutor::$$context }}
```

The shorthand only applies to the `Mutor` namespace. All other namespaces, `Math::`, `Array::`, `JSON::`, and so on, must always be written in full.
