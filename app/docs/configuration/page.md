# Configuration

All configuration is passed to the constructor. Every option is optional — instantiating with no arguments gives you sensible defaults.

```javascript
const mutor = new Mutor({
  autoEscape: true,
  allowFnCalls: false,
  preserveEscapeDelimiter: false,
  debugRuntimeErrors: false,
  rootDir: "./views",
  cache: {
    active: true,
    maxSize: 50 * 1024 * 1024,
  },
  delimiters: {
    openingTag: "\{{",
    closingTag: "}}",
    openingTagEscape: "\\",
    whitespaceTrim: "~",
  },
  build: {
    include: new Set([".html", ".txt"]),
    exclude: new Set(["node_modules", ".git"]),
  },
  onIncludeFail: "throw",
});
```

Configuration can also be updated after instantiation:

```javascript
mutor.addConfig({ autoEscape: false });
```

To restore all options to their defaults:

```javascript
mutor.restoreDefaultConfig();
```

---

## `autoEscape`

**Type:** `boolean` — **Default:** `true`

Controls whether interpolated values are HTML-escaped before being written to output. Enabled by default.

```javascript
const mutor = new Mutor({ autoEscape: false });
```

Leave this on unless you have a specific reason to disable it — such as rendering plain text output where HTML entities would be incorrect. When `autoEscape` is off and you need to escape a specific value, use `HTML::escape` explicitly.

---

## `allowFnCalls`

**Type:** `boolean` — **Default:** `false`

Controls whether templates can call functions from context values.

```javascript
const mutor = new Mutor({ allowFnCalls: true });
```

When `false`, calling a context function throws at render time:

```html
\{{ user.getFullName() }} \{{# throws if allowFnCalls is false }}
```

Namespace calls — `Math::round`, `Array::range`, and so on — are always permitted regardless of this setting. `allowFnCalls` only governs functions on the context object.

Enable this only when you control the context entirely. In environments where the context contains user-supplied data, leaving this off prevents templates from invoking methods on untrusted values.

---

## `preserveEscapeDelimiter`

**Type:** `boolean` — **Default:** `false`

Controls whether the escape marker is kept in the output when a tag is escaped with `\ {{~}}\{{`.

With the default (`false`), `\ {{~}}\{{ name }}` renders as `\{{ name }}` — the backslash is stripped.

With `preserveEscapeDelimiter: true`, it renders as `\ {{~}}\{{ name }}` — the backslash is preserved.

```javascript
const mutor = new Mutor({ preserveEscapeDelimiter: true });
```

This is useful when the output itself will be processed by another tool that needs to see the escape marker.

---

## `debugRuntimeErrors`

**Type:** `boolean` — **Default:** `false`

When enabled, runtime errors in expression outputs are wrapped with source context — the template line and column where the failure occurred.

```javascript
const mutor = new Mutor({ debugRuntimeErrors: true });
```

This is a development tool. The source tracking is embedded at compile time and adds overhead to every compiled template. Do not enable it in production.

---

## `rootDir`

**Type:** `string` — **Default:** `undefined`

*(Server entry point only — `mutorjs/server`)*

The root of your views directory. Setting this enables the `@/` include alias, which resolves paths from `rootDir` regardless of the file currently being rendered.

```javascript
const mutor = new Mutor({ rootDir: "./views" });
```

When set, all file includes are constrained to this directory. A template cannot include files outside the configured root.

---

## `cache`

**Type:** `object` — **Default:** `{ active: true, maxSize: 50 * 1024 * 1024 }`

Controls compiled template caching.

```javascript
const mutor = new Mutor({
  cache: {
    active: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  },
});
```

### `cache.active`

**Type:** `boolean` — **Default:** `true`

Enables or disables the cache. When disabled, every render recompiles from source. Disable during development if you want templates to always reflect the latest source without manual cache invalidation.

### `cache.maxSize`

**Type:** `number` — **Default:** `52428800` (50MB)

The maximum total size of cached compiled templates in bytes. When the cache exceeds this limit, the least recently used entries are evicted automatically.

Tune this based on the number and size of your templates. For large applications with many templates, increasing this reduces recompilation at the cost of memory. For small projects, the default is more than sufficient.

---

## `delimiters`

**Type:** `object`

Customizes the tag syntax. Useful when the default `\{{ }}` syntax conflicts with another templating system or framework in your stack.

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

### `delimiters.openingTag`

**Default:** `"\{{"`

The string that opens a template expression.

### `delimiters.closingTag`

**Default:** `"}}"`

The string that closes a template expression.

### `delimiters.openingTagEscape`

**Default:** `"\\"`

The character that escapes an opening tag, preventing it from being evaluated. The escape marker is stripped from the output unless `preserveEscapeDelimiter` is enabled.

### `delimiters.whitespaceTrim`

**Default:** `"~"`

The character used to trim whitespace adjacent to a tag. Place it immediately inside the opening or closing delimiter.

The comment marker is always `#` and cannot be customized.

---

## `build`

**Type:** `object`

*(Server entry point only — `mutorjs/server`)*

Controls which files `buildDir` and `compileDir` process when traversing a directory.

```javascript
const mutor = new Mutor({
  build: {
    include: new Set([".html", ".txt", ".xml"]),
    exclude: new Set(["node_modules", ".git", "drafts"]),
  },
});
```

### `build.include`

**Type:** `Set<string>` — **Default:** `new Set([".html", ".txt"])`

File extensions treated as templates. Files with matching extensions are compiled and rendered. Everything else is copied as-is.

### `build.exclude`

**Type:** `Set<string>` — **Default:** `new Set(["node_modules", ".git"])`

Directory or file names to skip entirely during traversal. Names are matched against each path segment, not the full path.

---

## `onIncludeFail`

**Type:** `"throw" | "empty" | "log"` — **Default:** `"throw"`

Controls what happens when an include references a component or file that does not exist.

```javascript
const mutor = new Mutor({ onIncludeFail: "empty" });
```

| Value | Behavior |
| --- | --- |
| `"throw"` | Throws an error. Default. |
| `"empty"` | Renders nothing at the include site. |
| `"log"` | Logs the failure and renders nothing. |

Use `"throw"` in development to surface missing includes immediately. Switch to `"empty"` or `"log"` in production if you prefer graceful degradation over hard failures.

---

## `onIncludeError`

**Type:** `(identifier: string, error: Error) => string` — **Default:** `undefined`

A function that receives the include identifier and the error, and returns fallback content to render in place of the failed include. Takes precedence over `onIncludeFail` when both are set.

```javascript
const mutor = new Mutor({
  onIncludeError: (identifier, error) => {
    console.error(`Include failed: ${identifier}`, error);
    return `<!-- component "${identifier}" unavailable -->`;
  },
});
```

Use this for fine-grained control over fallback rendering — for example, returning a placeholder component, logging to an external service, or varying the fallback based on which component failed.

---

## `allowedProps` and `forbiddenProps`

**Type:** `Set<string>`

Customizes the property access blocklist.

```javascript
const mutor = new Mutor({
  allowedProps: new Set(["constructor"]),   // unblock a default-blocked property
  forbiddenProps: new Set(["passwordHash"]), // block an additional property
});
```

`allowedProps` removes entries from the default blocklist. `forbiddenProps` adds entries to it.

The default blocked properties are: `__proto__`, `constructor`, `prototype`, `__defineGetter__`, `__defineSetter__`, `__lookupGetter__`, `__lookupSetter__`, `caller`, `callee`, and `arguments`. Unblocking any of these should be done with care.
