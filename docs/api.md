# API Reference

This page summarizes the public API described in the Mutor.js README.

## Core API

Import from `mutorjs`:

```javascript
import Mutor from "mutorjs";
```

### `render(template, context)`

Render a template string.

### `compile(template)`

Compile a template string and return a reusable render function.

### `registerComponent(identifier, template)`

Register a reusable component or partial in memory.

### `renderComponent(identifier, context)`

Render a registered component by identifier.

### `addLayout(template)`

Register an in-memory layout template.

### `invalidateTemplateCacheEntry(identifier)`

Remove a cached component entry.

### `addConfig(config)`

Update the engine config.

### `restoreDefaultConfig()`

Restore the default config.

### `getDiagnostics()`

Return cache diagnostics.

### `reset()`

Restore the default config and clear cached templates and layouts.

## Server API

Import from `mutorjs/server`:

```javascript
import Mutor from "mutorjs/server";
```

### `renderFile(path, context)`

Render a template file.

### `buildDir(src, destination, context, keepLayoutFiles?)`

Render a directory into another directory.

### `compileDir(src)`

Precompile matching files in a directory into the cache.

### `addLayoutFromPath(path)`

Register a layout template from a file path.

### `addLayoutsInDir(dir)`

Recursively register layout templates found in a directory.

### `invalidateTemplateCacheEntry(path)`

Remove a cached file entry.

### `invalidateLayoutCacheEntry(path)`

Remove a cached server layout entry.

## Notes

- use the core package for in-memory rendering
- use the server package for file rendering, layout discovery, and directory builds
- rendering APIs are synchronous; some directory-oriented helpers are asynchronous
