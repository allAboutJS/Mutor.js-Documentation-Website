# Namespaces

Namespaces are groups of trusted helper functions and values available from inside templates. They are called with `::` notation — `Namespace::member`.

```html
\{{ Math::abs(-5) }}
\{{ JSON::stringify(user) }}
\{{ Array::range(1, 5) }}
```

Namespace calls are always permitted, even when `allowFnCalls` is `false`. This is the key distinction between a namespace helper and a function on the context object — namespaces are part of Mutor's trusted surface, context functions are not.

## Mutor shorthand

Members of the `Mutor` namespace can be called with `::` directly, without the prefix:

```html
\{{ ::include("card") }}
\{{ ::$$context }}
```

These are identical to:

```html
\{{ Mutor::include("card") }}
\{{ Mutor::$$context }}
```

All other namespaces must always be written in full.

---

## HTML

The `HTML` namespace handles escaping and safe output.

### `HTML::escape(value)`

Escapes a string for safe HTML output. This is the same escaping Mutor applies automatically to all interpolated values when `autoEscape` is enabled.

```html
\{{ HTML::escape(userInput) }}
```

Useful when `autoEscape` is off and you need to escape a specific value explicitly.

### `HTML::safe(value)`

Marks a value as trusted and bypasses escaping. The value is written to the output as-is.

```html
\{{ HTML::safe(article.body) }}
```

Only use `HTML::safe` for values you fully control. It does not sanitize — it disables the protection entirely for that value.

---

## JSON

### `JSON::stringify(value, indent?)`

Serializes a value to a JSON string. Accepts an optional indent argument for pretty-printing.

```html
\{{ JSON::stringify(user) }}
\{{ JSON::stringify(user, 2) }}
```

Useful for debugging context values or passing structured data to `<script>` tags:

```html
<script>
  const data = \{{ HTML::safe(JSON::stringify(pageData)) }};
</script>
```

### `JSON::parse(value)`

Parses a JSON string into a value. Use this when structured data arrives as a string through the context and you need to work with it in the template.

```html
\{{ for item of JSON::parse(rawJson) }}
  <li>\{{ item.name }}</li>
  \{{ endfor }}
```

---

## Object

### `Object::keys(obj)`

Returns an array of the object's own enumerable keys.

```html
\{{ for key of Object::keys(user) }}
  <p>\{{ key }}</p>
  \{{ endfor }}
```

### `Object::values(obj)`

Returns an array of the object's own enumerable values.

```html
\{{ for value of Object::values(config) }}
  <span>\{{ value }}</span>
  \{{ endfor }}
```

### `Object::entries(obj)`

Returns an array of `[key, value]` pairs.

```html
\{{ for entry of Object::entries(user) }}
  <p>\{{ entry[0] }}: \{{ entry[1] }}</p>
  \{{ endfor }}
```

### `Object::hasOwn(obj, key)`

Returns `true` if the object has the given key as an own property.

```html
\{{ if Object::hasOwn(user, "avatar") }}
  <img src="\{{ user.avatar }}" />
  \{{ endif }}
```

### `Object::fromEntries(entries)`

Constructs an object from an array of `[key, value]` pairs.

### `Object::pick(obj, keys)`

Returns a new object containing only the specified keys.

```html
\{{ JSON::stringify(Object::pick(user, ["name", "email"])) }}
```

### `Object::omit(obj, keys)`

Returns a new object with the specified keys removed.

```html
\{{ JSON::stringify(Object::omit(user, ["passwordHash", "token"])) }}
```

---

## Array

### `Array::isArray(value)`

Returns `true` if the value is an array.

```html
\{{ if Array::isArray(tags) }}
  \{{ for tag of tags }}<span>\{{ tag }}</span>\{{ endfor }}
  \{{ endif }}
```

### `Array::from(value)`

Creates an array from an iterable or array-like value.

### `Array::of(...values)`

Creates an array from the given arguments.

### `Array::unique(arr)`

Returns a new array with duplicate values removed.

```html
\{{ for tag of Array::unique(tags) }}
  <span>\{{ tag }}</span>
  \{{ endfor }}
```

### `Array::compact(arr)`

Returns a new array with all falsy values removed — `false`, `0`, `""`, `null`, `undefined`.

```html
\{{ for item of Array::compact(list) }}
  <li>\{{ item }}</li>
  \{{ endfor }}
```

### `Array::chunk(arr, size)`

Splits an array into chunks of the given size. Returns an array of arrays.

```html
\{{ for row of Array::chunk(items, 3) }}
  <div class="row">
    \{{ for item of row }}
      <div class="col">\{{ item.name }}</div>
      \{{ endfor }}
  </div>
\{{ endfor }}
```

### `Array::range(start, end)`

Returns an array of integers from `start` up to and including `end`.

```html
\{{ for n of Array::range(1, 5) }}
  <li>\{{ n }}</li>
  \{{ endfor }}
```

Renders: 1, 2, 3, 4, 5.

---

## Number

### `Number::isFinite(value)` / `Number::isNaN(value)` / `Number::isInteger(value)`

Type-checking predicates.

```html
\{{ if Number::isFinite(score) }}\{{ score }}\{{ else }}N/A\{{ endif }}
```

### `Number::parseInt(value)` / `Number::parseFloat(value)`

Parse strings to numbers.

```html
\{{ Number::parseInt(queryParam) + 1 }}
```

### `Number::clamp(value, min, max)`

Constrains a number to the given range.

```html
\{{ Number::clamp(page, 1, totalPages) }}
```

### `Number::toFixed(value, digits)`

Formats a number to a fixed number of decimal places. Returns a string.

```html
\{{ Number::toFixed(price, 2) }}
```

### `Number::random()`

Returns a random float between 0 and 1.

---

## String

### `String::capitalize(value)`

Capitalizes the first character of a string.

```html
\{{ String::capitalize(user.name) }}
```

### `String::fromCharCode(...codes)`

Returns a string from the given character codes.

---

## Math

### `Math::abs(value)`

Returns the absolute value of a number.

```html
\{{ Math::abs(-42) }}  \{{# 42 }}
```

### `Math::floor(value)`

Rounds a number down to the nearest integer.

```html
\{{ Math::floor(4.9) }}  \{{# 4 }}
\{{ Math::floor(-1.2) }} \{{# -2 }}
```

### `Math::ceil(value)`

Rounds a number up to the nearest integer.

```html
\{{ Math::ceil(4.1) }}  \{{# 5 }}
\{{ Math::ceil(-1.8) }} \{{# -1 }}
```

### `Math::round(value)`

Rounds a number to the nearest integer. Halves round up.

```html
\{{ Math::round(4.5) }} \{{# 5 }}
\{{ Math::round(4.4) }} \{{# 4 }}
```

### `Math::sqrt(value)`

Returns the square root of a number.

```html
\{{ Math::sqrt(144) }} \{{# 12 }}
```

### `Math::pow(base, exponent)`

Returns the base raised to the given exponent.

```html
\{{ Math::pow(2, 10) }} \{{# 1024 }}
```

### `Math::max(...values)`

Returns the largest of the given values.

```html
\{{ Math::max(3, 7, 2) }} \{{# 7 }}
```

Useful for enforcing a lower bound:

```html
\{{ Math::max(offset, 0) }}
```

### `Math::min(...values)`

Returns the smallest of the given values.

```html
\{{ Math::min(3, 7, 2) }} \{{# 2 }}
```

Useful for enforcing an upper bound:

```html
\{{ Math::min(page, totalPages) }}
```

### `Math::PI`

The mathematical constant π.

```html
\{{ Math::PI }} {{# 3.141592653589793 }}
```

---

## Date

### `Date::now()`

Returns the current timestamp in milliseconds.

### `Date::parse(value)`

Parses a date string and returns a timestamp.

### `Date::new(value)`

Creates a Date object from a string or timestamp.

### `Date::iso(value)`

Returns an ISO 8601 string for the given date or timestamp.

```html
<time datetime="\{{ Date::iso(post.createdAt) }}">\{{ Date::iso(post.createdAt) }}</time>
```

### `Date::timestamp(value)`

Returns the Unix timestamp (in milliseconds) for a given date string or Date object.

---

## Boolean

### `Boolean::valueOf(value)`

Converts a value to its boolean equivalent.

---

## URL

### `URL::encode(value)`

Encodes a string for safe use in a URL.

```html
<a href="/search?q=\{{ URL::encode(query) }}">Search</a>
```

### `URL::decode(value)`

Decodes a URL-encoded string.

---

## Mutor

### `Mutor::include(identifier, context?)`

Includes a registered component or file partial. See [Components & Layouts](/docs/components-and-layouts) for full usage.

```html
\{{ Mutor::include("card") }}
\{{ Mutor::include("card", item) }}
```

### `Mutor::$$context`

The full current context object. Useful for debugging or passing the entire context to an include explicitly.

```html
<pre>\{{ JSON::stringify(::$$context, 2) }}</pre>
```
### `Mutor::slot`

Marks the injection point inside a layout where child content is rendered. A layout without `\{{ ::slot }}` discards all child content silently.

```html
\{{# layout "root" }}
<!doctype html>
<html>
  <body>
    \{{ ::slot }}
  </body>
</html>
```

`::slot` is only meaningful inside a layout template. Using it outside a layout produces no output.
