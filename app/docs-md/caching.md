# Caching

Mutor caches compiled templates by identifier or absolute file path.

## Component and template cache entries

For registered components:

```javascript
mutor.registerComponent("card", "<article>{{ title }}</article>");
mutor.invalidateTemplateCacheEntry("card");
```

For server files:

```javascript
mutor.renderFile("./views/page.html", context);
mutor.invalidateTemplateCacheEntry("./views/page.html");
```

## Layout cache entries

For layout files in the server runtime:

```javascript
mutor.invalidateLayoutCacheEntry("./views/layouts/root.html");
```

## Inspect cache usage

```javascript
mutor.getDiagnostics();
```

## Reset everything

Reset clears cached templates and layouts and restores the default config:

```javascript
mutor.reset();
```

## Configure the cache

```javascript
const mutor = new Mutor({
  cache: {
    active: true,
    maxSize: 50 * 1024 * 1024,
  },
});
```

Use caching when you render the same templates repeatedly and want to avoid recompiling them each time.
