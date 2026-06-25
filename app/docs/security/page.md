# Security

Mutor is designed with a security-conscious default configuration. This page explains the threat model, what protections are in place, and what remains the caller's responsibility.

---

## What Mutor protects against

### Prototype pollution

Template expressions are parsed by Mutor's own AST compiler — they are never passed to `eval` or `Function`. The compiler enforces a read-only expression language. There are no assignment operators, no `new` expressions, and no way to mutate the context or any object in scope from within a template.

Dangerous property names are blocked at both compile time and runtime. Accessing any of the following throws before the value is ever read:

```txt
__proto__
constructor
prototype
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
caller
callee
arguments
```

This applies to dot notation and bracket notation alike:

```html
\{{ user.__proto__ }}         \{{# blocked }}
\{{ user["constructor"] }}    \{{# blocked }}
\{{ obj[dynamicKey] }}        \{{# blocked if dynamicKey resolves to a blocked name }}
```

Bracket notation is validated against the resolved runtime value of the key, not the source string. A dynamic key that resolves to `"__proto__"` at runtime is caught the same as a literal `.__proto__` in the source.

### Cross-site scripting

All interpolated values are HTML-escaped by default. Characters with special meaning in HTML — `<`, `>`, `&`, `"`, `'` — are replaced with their entity equivalents before being written to output.

```html
\{{ userInput }}
```

If `userInput` is `<script>alert('xss')</script>`, the output is:

```html
&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;
```

This is controlled by the `autoEscape` config option, which is `true` by default. Do not disable it unless you have a specific and deliberate reason.

### Unauthorized function calls

Functions on context values cannot be called from templates by default. `allowFnCalls` is `false` unless explicitly enabled.

```html
\{{ user.deleteAccount() }} \{{# throws if allowFnCalls is false }}
```

This prevents templates from invoking methods on objects in the context — particularly important when the context contains user-supplied or externally sourced data.

Namespace calls — `Math::round`, `Array::range`, `HTML::safe`, and so on — are always permitted. They are part of Mutor's trusted surface and are not affected by `allowFnCalls`.

---

## Customizing the blocklist

The default blocked property list can be extended or narrowed with `allowedProps` and `forbiddenProps`.

```javascript
const mutor = new Mutor({
  forbiddenProps: new Set(["passwordHash", "token", "secret"]),
});
```

This blocks access to application-specific sensitive properties from within templates — useful as a defense-in-depth measure when your context objects carry fields that should never be rendered.

```javascript
const mutor = new Mutor({
  allowedProps: new Set(["constructor"]),
});
```

Removing entries from the default blocklist should be done with care and only when you have a concrete reason to do so.

---

## What Mutor does not protect against

### Mutor is not a sandbox

Mutor constrains the template language but it does not provide process-level isolation. A sufficiently privileged context object — one that exposes `require`, `process`, `fs`, or other Node.js globals — could be exploited even within the constraints Mutor applies. Never pass Node.js built-ins or sensitive runtime objects into the render context.

### Mutor is not an HTML sanitizer

Default escaping prevents user-supplied values from being interpreted as HTML when interpolated. It does not sanitize HTML content passed through `HTML::safe`. Values rendered with `HTML::safe` are written verbatim to the output — no escaping, no sanitization.

```html
\{{ HTML::safe(article.body) }}   \{{# no protection applied }}
```

If `article.body` contains user-supplied HTML, you are responsible for sanitizing it before passing it to the template. Mutor does not do this for you. Use a dedicated HTML sanitizer — such as [DOMPurify](https://github.com/cure53/DOMPurify) on the client or [sanitize-html](https://github.com/apostrophecms/sanitize-html) on the server — before calling `HTML::safe`.

### Context-sensitive escaping

Mutor applies the same HTML entity escaping to all interpolated values regardless of where in the document they appear. It does not perform context-sensitive output encoding — escaping that varies based on whether a value is interpolated inside an HTML attribute, a `<script>` tag, a `<style>` block, or a URL.

If you are interpolating values inside JavaScript, CSS, or URL contexts, apply the appropriate encoding in your application code before passing the value to the template:

```javascript
mutor.render(`<a href="\{{ href }}">\{{ label }}</a>`, {
  href: encodeURIComponent(userInput),
  label: userInput,
});
```

---

## Secure defaults at a glance

| Protection | Default | Config option |
| --- | --- | --- |
| HTML escaping | On | `autoEscape` |
| Function calls from context | Blocked | `allowFnCalls` |
| Prototype property access | Blocked | `allowedProps` / `forbiddenProps` |
| Arbitrary code execution | Not possible | — |
| Assignment in templates | Not possible | — |
