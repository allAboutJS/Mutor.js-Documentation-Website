# Precompilation

Precompilation lets you compile templates ahead of time instead of waiting for the first render.

## Compile a template string

Use `compile(...)` when you want a reusable compiled function:

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();
const render = mutor.compile("<h1>{{ title }}</h1>");

const html = render({ title: "Hello" });
```

## Compile a directory on the server

`compileDir(...)` precompiles matching files into the cache:

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({ rootDir: "./views" });

await mutor.compileDir("./views");
```

When layout directives are found in matching files, those layouts are registered during compilation.

## Why precompile

Precompilation is useful when you:

- render the same templates many times
- want cache warmup during startup or deployment
- want layout files discovered before a request path needs them

## Related feature: directory builds

If you want rendered output rather than cached compiled templates, use `buildDir(...)` instead.
