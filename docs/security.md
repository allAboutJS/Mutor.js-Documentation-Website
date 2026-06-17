# Security

Mutor is designed to keep templates constrained without exposing the full JavaScript runtime.

## Default security model

By default:

- interpolated values are escaped
- function calls from context values are disabled
- namespace calls are allowed
- dangerous property names are blocked
- computed property access is validated
- template expressions are parsed by Mutor rather than executed as arbitrary template source

## Blocked properties

Mutor blocks access to dangerous properties such as:

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

## Allow or forbid additional properties

```javascript
const mutor = new Mutor({
  allowedProps: new Set(["constructor"]),
  forbiddenProps: new Set(["passwordHash"]),
});
```

## Function calls from context values

Use `allowFnCalls` deliberately:

```javascript
const mutor = new Mutor({
  allowFnCalls: true,
});
```

Namespace calls remain available even when normal function calls are disabled.

## Important limits

Mutor is a template engine, not a complete sandbox for hostile code.

It also is not a full HTML sanitization system. Default escaping is useful for ordinary templating, but context-sensitive output handling remains the caller's responsibility. Use `HTML::safe(...)` only for trusted content.
