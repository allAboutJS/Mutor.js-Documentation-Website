# Comments

Comments let you leave notes in a template without writing anything to the rendered output.

## Syntax

```html
{{# This will not render }}
```

## Example

```html
<header>
  {{# Temporary banner removed for launch }}
  <h1>{{ title }}</h1>
</header>
```

Rendered output:

```html
<header>
  <h1>Hello</h1>
</header>
```

## When to use comments

Use comments for short template notes, not for visible content. If you want text like `{{ name }}` to appear in output, escape the opening tag instead:

```html
\{{ name }}
```
