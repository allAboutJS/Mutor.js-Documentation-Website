# Migrating from v2 to v3

This guide summarizes the v3 changes called out in the upstream README and how they affect existing templates and integration code.

## Key changes in v3

- sync-only runtime and API surface
- official layout support via `{{# layout ... }}` and `{{# use ... }}`
- file-based layout loading for the server runtime
- improved file path resolution for `renderFile(...)` and includes
- stronger directory build guards
- expanded regression coverage for client and server behavior

## 1. Update rendering expectations

Mutor v3 is centered on synchronous rendering APIs.

Review application code that previously treated `render(...)`, `renderComponent(...)`, or `renderFile(...)` like async operations and update it to use the returned value directly.

## 2. Adopt the v3 layout syntax

Layouts are now an official feature and use top-of-file directives.

### Define a layout

```html
{{# layout "shell" }}
<html>
  <body>
    {{ ::slot }}
  </body>
</html>
```

### Use a layout

```html
{{# use "shell" }}
<h1>{{ title }}</h1>
```

If you had custom layout composition before, migrate those templates to `{{# layout ... }}` and `{{# use ... }}`.

## 3. Recheck server-side paths

Mutor v3 improves file path resolution for `renderFile(...)` and includes. Re-test any file-based rendering flow that depends on relative includes or `rootDir` aliases such as `@/partials/header.html`.

## 4. Revisit directory builds

The README notes stronger directory build guards in v3. In particular, the destination directory must not be the same as, or a child of, the source directory.

## 5. Take advantage of file-based layouts

On the server runtime, you can register layouts from files or directories:

```javascript
mutor.addLayoutFromPath("./views/layouts/root.html");
await mutor.addLayoutsInDir("./views/layouts");
```

## Migration checklist

- update any render call sites that assumed async behavior
- move layout templates to the v3 directive syntax
- verify includes and `renderFile(...)` paths
- re-test `buildDir(...)` destination rules
- re-run templates that depend on cached or precompiled layouts
