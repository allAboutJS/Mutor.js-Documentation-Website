# Context

The context is the data object you pass into rendering. Templates read values from that object.

## Pass context to `render(...)`

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();

const html = mutor.render("Hello, {{ user.name }}.", {
  user: { name: "Ada" },
});
```

## Access values in a template

```html
{{ user.name }}
{{ user?.profile?.name }}
{{ user["name"] }}
{{ name ?? "Anonymous" }}
```

## Current context inside templates

The current context is always available as `Mutor::$$context`:

```html
<pre>{{ JSON::stringify(Mutor::$$context, 2) }}</pre>
```

Mutor-specific members also support a shorthand alias, so this is equivalent:

```html
{{ ::$$context }}
```

## Includes and context inheritance

Includes inherit the parent context when you do not pass another value:

```html
{{ Mutor::include("profile-card") }}
```

Pass a different context to scope the include to another object:

```html
{{ Mutor::include("profile-card", user) }}
```

## Important limits

Templates can read data and evaluate supported expressions, but they do not allow object literals, array literals, or function literals inside template source.

If you need structured data, pass it through context or use namespace helpers such as `JSON::parse(...)`.
