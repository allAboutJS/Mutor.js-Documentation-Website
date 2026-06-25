# CLI

Mutor ships with a small command-line interface.

## Basic usage

```sh
mutor <command> <input> [options]
```

## Render a file

```sh
mutor render ./views/home.html --data ./data.json --out ./dist/home.html
```

Without `--out`, the result is printed to stdout.

## Build a directory

```sh
mutor build ./site --data ./data.json --out ./dist
```

## Compile a template

```sh
mutor compile ./views/home.html --out ./compiled.txt
```

## Options

| Option | Meaning |
| --- | --- |
| `--data <path>` | JSON data file used as render context |
| `--out <path>` | Output file or directory |
| `--config <path>` | JSON config file |
| `--version` | Print the installed version |
| `--help` | Show CLI help |

## When to use the CLI

The CLI is useful for quick local rendering, static-site style builds, and scripted template compilation.
