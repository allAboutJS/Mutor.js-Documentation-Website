# Namespaces

Namespaces are trusted helper groups available from templates. Namespace calls are allowed even when normal function calls are disabled.

## Basic syntax

```html
{{ Math::abs(-5) }}
{{ Array::range(1, 3) }}
{{ Object::keys(user) }}
{{ JSON::stringify(user) }}
{{ String::capitalize(name) }}
{{ HTML::escape(value) }}
{{ HTML::safe(trustedHtml) }}
```

## Mutor shorthand

Mutor-specific namespace members support a shorthand alias: `::prop` is equivalent to `Mutor::prop`.

```html
{{ Mutor::$$context }}
{{ ::$$context }}

{{ Mutor::include("card") }}
{{ ::include("card") }}
```

## Useful built-ins

| Namespace | Examples |
| --- | --- |
| `HTML` | `escape`, `safe` |
| `JSON` | `stringify`, `parse` |
| `Object` | `keys`, `values`, `entries`, `hasOwn`, `fromEntries`, `pick`, `omit` |
| `Array` | `isArray`, `from`, `of`, `unique`, `compact`, `chunk`, `range` |
| `Number` | `isFinite`, `isNaN`, `isInteger`, `parseInt`, `parseFloat`, `clamp`, `toFixed`, `random` |
| `String` | `fromCharCode`, `capitalize` |
| `Math` | `abs`, `floor`, `ceil`, `round`, `sqrt`, `pow`, `max`, `min`, `PI` |
| `Date` | `now`, `parse`, `new`, `iso`, `timestamp` |
| `Boolean` | `valueOf` |
| `URL` | `encode`, `decode` |
| `Mutor` | `include`, `$$context` |

## Why namespaces matter

Namespaces give templates controlled access to useful helpers without enabling unrestricted function execution from context values.
