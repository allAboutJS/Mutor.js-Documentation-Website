# Configuration

Configure Mutor by passing an options object to the constructor.

## Example

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
    openingTag: "{{",
    closingTag: "}}",
    openingTagEscape: "\\",
    whitespaceTrim: "~",
    commentTag: "#",
  },
  build: {
    include: new Set([".html", ".txt"]),
    exclude: new Set(["node_modules", ".git"]),
  },
  onIncludeFail: "throw",
});
```

## Core options

### `autoEscape`

Escape interpolated output. Enabled by default.

### `allowFnCalls`

Allow templates to call functions from context values. Disabled by default.

### `delimiters`

Customize tags and control markers.

### `preserveEscapeDelimiter`

Control whether escaped opening tags keep their escape marker.

### `rootDir`

Used by the server renderer for top-level file resolution and `@/` includes.

### `cache`

Control compiled template caching.

### `build`

Control which files `buildDir(...)` and `compileDir(...)` process.

### `onIncludeFail`

Control what happens when an include fails.

### `onIncludeError`

Return fallback content for failed includes.

### `debugRuntimeErrors`

Wrap runtime failures with template source context.

## Good practice

Start with the defaults, then change only what your project needs. In most cases, keep `autoEscape` enabled and `allowFnCalls` disabled unless you have a clear reason to change them.
