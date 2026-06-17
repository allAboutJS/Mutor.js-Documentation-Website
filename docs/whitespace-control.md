# Whitespace Control

Use `~` next to a tag to trim whitespace on that side.

## Trim both sides

```html
Hello {{~ name ~}} !
```

This is useful when template formatting would otherwise introduce extra spaces or newlines.

## Trim the left side

```html
Hello {{~ name }}
```

## Trim the right side

```html
Hello {{ name ~}}
```

## Common use cases

- inline text where spaces matter
- looping or conditional blocks that would otherwise leave blank lines
- keeping templates readable without changing the final output

Use trimming deliberately. It is best for cleanup around tags, not for replacing normal HTML formatting.
