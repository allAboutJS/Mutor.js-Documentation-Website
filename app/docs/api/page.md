# API Reference

Mutor ships two entry points with distinct APIs. The core API is available in both Node.js and the browser. The server API extends it with file system methods and is Node.js only.

---

## Core API

```javascript
import Mutor from "mutorjs";
```

### `new Mutor(config?)`

Creates a new engine instance. All configuration is optional.

```javascript
const mutor = new Mutor();

const mutor = new Mutor({
  autoEscape: true,
  allowFnCalls: false,
  rootDir: "./views",
});
```

Each instance maintains its own config, component registry, layout registry, and template cache. Instances are independent — registering a component on one has no effect on another.

---

### `render(template, context)`

Compiles and renders a template string against a context object. Returns the rendered string.

```javascript
const html = mutor.render("Hello, \{{ name }}.", { name: "Ada" });
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `template` | `string` | The template string to render |
| `context` | `object` | The data available to the template |

The compiled template is cached by its string content. Subsequent calls with the same template string skip compilation and hit the cache directly.

---

### `compile(template)`

Compiles a template string and returns a reusable render function. Use this when you need to render the same template many times against different contexts without the overhead of cache lookup on each call.

```javascript
const render = mutor.compile("Hello, \{{ name }}.");

const a = render({ name: "Ada" });
const b = render({ name: "Grace" });
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `template` | `string` | The template string to compile |

**Returns:** `(context: object) => string`

---

### `registerComponent(identifier, template)`

Registers a named template string as a reusable component. Components can be rendered directly with `renderComponent` or included inside other templates with `Mutor::include`.

```javascript
mutor.registerComponent("card", `
<article>
  <h2>\{{ title }}</h2>
  <p>\{{ body }}</p>
</article>
`);
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The name used to reference the component |
| `template` | `string` | The template string |

Registering a component under an existing identifier overwrites the previous registration.

---

### `renderComponent(identifier, context)`

Renders a registered component against a context object. Returns the rendered string.

```javascript
const html = mutor.renderComponent("card", {
  title: "Hello",
  body: "This is a card.",
});
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The name of the registered component |
| `context` | `object` | The data available to the component |

Throws if the component has not been registered, unless `onIncludeFail` is set to `"empty"` or `"log"`.

---

### `addLayout(template)`

Registers an in-memory layout. The template must declare its name with `\{{# layout "name" }}` at the top.

```javascript
mutor.addLayout(`
\{{# layout "root" }}
<!doctype html>
<html>
  <body>\{{ ::slot }}</body>
</html>
`);
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `template` | `string` | The layout template string, beginning with `\{{# layout "name" }}` |

Throws if the template does not contain a valid `\{{# layout }}` directive. Throws if a circular layout dependency is detected.

---

### `invalidateTemplateCacheEntry(identifier)`

Removes a single compiled template from the cache by its identifier. For components, the identifier is the name passed to `registerComponent`. For rendered strings, it is the template string itself.

```javascript
mutor.invalidateTemplateCacheEntry("card");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `identifier` | `string` | The cache key to invalidate |

Has no effect if the identifier is not in the cache.

---

### `addConfig(config)`

Merges new configuration into the current instance config. Only the provided keys are updated — all other options retain their current values.

```javascript
mutor.addConfig({ autoEscape: false });
mutor.addConfig({ cache: { active: false } });
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `config` | `Partial<MutorConfig>` | Config keys to update |

---

### `restoreDefaultConfig()`

Resets all configuration options to their defaults. Does not clear the component registry, layout registry, or template cache.

```javascript
mutor.restoreDefaultConfig();
```

---

### `getDiagnostics()`

Returns an object describing the current state of the template cache — entries, sizes, and hit counts.

```javascript
const diagnostics = mutor.getDiagnostics();
console.log(diagnostics);
```

Use this in development to inspect cache usage and identify unexpectedly large or uncached templates.

---

### `reset()`

Clears all cached templates and layouts, clears the component registry, and restores all configuration to defaults. Equivalent to calling `restoreDefaultConfig()` and clearing all internal state.

```javascript
mutor.reset();
```

Useful in test environments where you want a clean instance between test cases without instantiating a new one.

---

## Server API

```javascript
import Mutor from "mutorjs/server";
```

All core API methods are available. The server entry adds the following.

---

### `renderFile(path, context)`

Renders a template file at the given path against a context object. Returns the rendered string synchronously.

```javascript
const html = mutor.renderFile("./views/pages/home.html", {
  title: "Home",
  user: { name: "Ada" },
});
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | Absolute or relative path to the template file |
| `context` | `object` | The data available to the template |

The file is compiled on first access and cached by its absolute path. Subsequent calls with the same path skip compilation and hit the cache.

If the file declares a layout with `\{{# use "name" }}`, the layout must already be registered — either via `addLayout`, `addLayoutFromPath`, or `addLayoutsInDir` — before `renderFile` is called.

---

### `buildDir(src, destination, context, keepLayoutFiles?)`

Renders an entire directory of templates into a destination directory. Non-template files are copied as-is. Returns a Promise.

```javascript
await mutor.buildDir("./site", "./dist", {
  title: "Mutor Docs",
  year: 2025,
});
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `src` | `string` | Path to the source directory |
| `destination` | `string` | Path to the output directory |
| `context` | `object` | The data available to all rendered templates |
| `keepLayoutFiles?` | `boolean` | Whether to copy layout files to the output. Default `false` |

The destination directory must not be the same as, or a child of, the source directory. Mutor enforces this and throws before writing any files.

Which files are treated as templates is controlled by the `build.include` and `build.exclude` config options.

---

### `compileDir(src)`

Precompiles all matching files in a directory into the template cache without rendering them. Returns a Promise.

```javascript
await mutor.compileDir("./views");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `src` | `string` | Path to the directory to compile |

Files with layout directives encountered during compilation are registered as layouts automatically. This makes `compileDir` a one-call alternative to running `addLayoutsInDir` and warming the cache separately.

Call this once at startup to eliminate compilation overhead on the first request to each template.

---

### `addLayoutFromPath(path)`

Loads a single layout file from disk and registers it. The file must declare its name with `\{{# layout "name" }}` at the top.

```javascript
mutor.addLayoutFromPath("./views/layouts/root.html");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | Path to the layout file |

Throws if the file does not contain a valid `\{{# layout }}` directive.

---

### `addLayoutsInDir(dir)`

Recursively scans a directory and registers every file that contains a `\{{# layout }}` directive. Returns a Promise.

```javascript
await mutor.addLayoutsInDir("./views/layouts");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `dir` | `string` | Path to the directory to scan |

Files without a `\{{# layout }}` directive are silently skipped. Call this once at startup before handling any requests.

---

### `invalidateTemplateCacheEntry(path)`

Removes a cached file entry by its absolute path. The file will be recompiled from disk on the next `renderFile` call.

```javascript
mutor.invalidateTemplateCacheEntry("./views/pages/home.html");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | Path to the cached file |

---

### `invalidateLayoutCacheEntry(path)`

Removes a cached layout entry by its file path.

```javascript
mutor.invalidateLayoutCacheEntry("./views/layouts/root.html");
```

**Parameters**

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | Path to the cached layout file |

The layout will need to be re-registered via `addLayoutFromPath` or `addLayoutsInDir` before it can be used again.
