# Debugging

Mutor keeps debugging simple: inspect your context, enable richer runtime errors, and check cache diagnostics when needed.

## Enable runtime error context

Use `debugRuntimeErrors` to wrap runtime failures with template source context:

```javascript
const mutor = new Mutor({
  debugRuntimeErrors: true,
});
```

## Inspect the current context

The current template context is available as `Mutor::$$context`:

```html
<pre>{{ JSON::stringify(Mutor::$$context, 2) }}</pre>
```

This is useful when a template is receiving unexpected data.

## Check cache diagnostics

```javascript
mutor.getDiagnostics();
```

Use this when you want to inspect cache usage or verify what is being cached.

## Handle include errors explicitly

`onIncludeFail` controls what happens when an include fails, and `onIncludeError` can return fallback content.

```javascript
const mutor = new Mutor({
  onIncludeFail: "throw",
  onIncludeError(meta, err) {
    console.error(meta, err);
  },
});
```

## Practical debugging tips

- confirm the context shape first
- test the smallest template that reproduces the issue
- remember that layout directives must be at the top of the template
- remember that function calls from context values are disabled by default
