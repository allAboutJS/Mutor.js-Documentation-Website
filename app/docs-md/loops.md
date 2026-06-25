# Loops

Mutor supports loops for arrays, iterable values, and object keys.

## Loop over arrays with `of`

```html
{{ for item of items }}
  <li>{{ item }}</li>
{{ endfor }}
```

Add an index with an optional second binding:

```html
{{ for item, index of items }}
  <li>{{ index }}: {{ item }}</li>
{{ endfor }}
```

## Loop over object keys with `in`

```html
{{ for key in user }}
  <p>{{ key }}</p>
{{ endfor }}
```

Bind both key and value when needed:

```html
{{ for key, value in user }}
  <p>{{ key }} = {{ value }}</p>
{{ endfor }}
```

## `break` and `continue`

Both are available inside loops.

```html
{{ for item of items }}
  {{ if item == 2 }}{{ continue }}{{ endif }}
  {{ item }}
  {{ if item == 3 }}{{ break }}{{ endif }}
{{ endfor }}
```

With `items = [1, 2, 3, 4]`, that renders:

```txt
13
```

## Practical advice

- use `of` for arrays and iterable values
- use `in` for object keys
- prefer simple loop bodies and move data shaping into your context when possible
