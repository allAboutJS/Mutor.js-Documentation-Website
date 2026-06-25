# Installation

Install Mutor.js from npm using your preferred package manager.

## npm

```sh
npm install mutorjs
```

## yarn

```sh
yarn add mutorjs
```

## pnpm

```sh
pnpm add mutorjs
```

## Importing Mutor

Use the core package for in-memory templates and registered components:

```javascript
import Mutor from "mutorjs";
```

Use the server entry when your templates live on disk:

```javascript
import Mutor from "mutorjs/server";
```

## Basic setup

```javascript
import Mutor from "mutorjs";

const mutor = new Mutor();
```

For server rendering, configure `rootDir` when you want top-level file resolution and `@/` include aliases:

```javascript
import Mutor from "mutorjs/server";

const mutor = new Mutor({
  rootDir: "./views",
});
```

## Next step

After installation, see `getting-started.md` for a first render example and common defaults such as HTML escaping.
