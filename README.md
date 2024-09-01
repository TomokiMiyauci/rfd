# rfd

File dialog, port of [Rust rfd](https://github.com/PolyMeilex/rfd).

## Install

deno:

```bash
deno add @miyauci/rfd
```

node:

```bash
npx jsr add @miyauci/rfd
```

## Usage

The `load` function must be called first. By default, it downloads and caches
remote binaries.

```ts
import { FileDialog, load } from "@miyauci/rfd/$RUNTIME";

await load();

const dialog = new FileDialog();
const path = dialog.pickFile();
```

### Supported Runtime

| Runtime | Import Specifier    |
| ------- | ------------------- |
| Deno    | `@miyauci/rfd/deno` |
| Node.js | `@miyauci/rfd/node` |

### Deno Runtime

#### Resource Management

Deno FFI requires explicit resource release. To prevent resource leaks, use
`using` or call `[Symbol.dispose]`. See
[ECMAScript Explicit Resource Management](https://github.com/tc39/proposal-explicit-resource-management).

```ts
import { FileDialog, load } from "@miyauci/rfd/deno";

await load();

using dialog = new FileDialog();
```

#### Unstable Feature Flags

The following flags are required for execution:

- `--unstable-ffi`

#### Permission Flags

The following permissions must be allowed:

| Permission     | Value                                       |
| -------------- | ------------------------------------------- |
| `--allow-env`  | <ul><li>`DENO_DIR`</li><li>`HOME`</li></ul> |
| `--allow-read` | `${DENO_DIR}/plug`                          |
| `--allow-ffi`  | path to binary cache                        |

## API

See [jsr doc](https://jsr.io/@miyauci/rfd) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
