# Conditions

Use conditional blocks to render different output based on the current context.

## `if`, `else if`, and `else`

```html
{{ if user.admin }}
  <strong>{{ user.name }}</strong>
{{ else if user.active }}
  <span>{{ user.name }}</span>
{{ else }}
  <em>Inactive user</em>
{{ endif }}
```

## Common patterns

### Show fallback text

```html
{{ if title }}
  <h1>{{ title }}</h1>
{{ else }}
  <h1>Untitled</h1>
{{ endif }}
```

### Use comparisons and boolean logic

```html
{{ if score >= 80 && active }}
  <p>Passed</p>
{{ else }}
  <p>Review needed</p>
{{ endif }}
```

## Tips

- conditions use Mutor expressions inside the tag
- keep branches explicit and readable
- use interpolation for small inline choices, such as ternaries

```html
{{ admin ? "Admin" : "Member" }}
```
