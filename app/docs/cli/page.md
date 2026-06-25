# CLI

Mutor ships with a command-line interface for rendering files, building directories, and compiling templates without writing any application code. It is useful for static site generation, build pipelines, and quick one-off renders.

```sh
mutor <command> <input> [options]
```

---

## Commands

### `render`

Renders a single template file against a JSON data file.

```sh
mutor render ./views/home.html --data ./data.json --out ./dist/home.html
```

Without `--out`, the rendered output is printed to stdout:

```sh
mutor render ./views/home.html --data ./data.json
```

This makes it composable with other Unix tools:

```sh
mutor render ./views/home.html --data ./data.json > ./dist/home.html
```

---

### `build`

Renders an entire directory of templates into an output directory. Non-template files are copied as-is.

```sh
mutor build ./site --data ./data.json --out ./dist
```

The source and destination directories must not overlap. Template files are determined by the `build.include` and `build.exclude` options in the config file, if provided.

---

### `compile`

Compiles a template file and writes the compiled output. Useful for inspecting what Mutor produces from a given template, or for verifying a template compiles without errors as part of a CI step.

```sh
mutor compile ./views/home.html --out ./compiled.txt
```

Without `--out`, the compiled output is printed to stdout.

---

## Options

| Option | Description |
| --- | --- |
| `--data <path>` | Path to a JSON file used as the render context |
| `--out <path>` | Output file or directory. Prints to stdout if omitted |
| `--config <path>` | Path to a JSON config file |
| `--version` | Print the installed Mutor version and exit |
| `--help` | Print CLI usage and exit |

---

## Providing config

Pass a JSON config file with `--config` to control engine behavior during the build:

```sh
mutor build ./site --data ./data.json --out ./dist --config ./mutor.config.json
```

The config file accepts the same options as the constructor, serialized as JSON:

```json
{
  "autoEscape": true,
  "rootDir": "./site",
  "build": {
    "include": [".html", ".txt", ".xml"],
    "exclude": ["node_modules", ".git", "drafts"]
  }
}
```

Note that `Set` values in the programmatic API — such as `build.include` and `build.exclude` — are expressed as plain arrays in the JSON config file.
