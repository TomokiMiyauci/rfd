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

In addition, see supported [runtime](#runtime).

### MessageDialog

`MessageDialog`は、[rdf::MessageDialog](https://docs.rs/rfd/0.14.1/rfd/struct.MessageDialog.html)に対応します。

```ts
import { load, MessageDialog } from "@miyauci/rfd/$RUNTIME";

await load();

const dialog = new MessageDialog();
const result = dialog.setLevel("Error").setButtons({
  kind: "OkCustom",
  custom: "Cancel",
})
  .show();
```

Rust enums are represented by JavaScript objects.

### Loading Local Binary

If you want to use a local binary, specify its path.

```ts
import { load } from "@miyauci/rfd/$RUNTIME";

await load("/path/to/bin");
```

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

This is usually used for debugging, etc.

## Support

Currently supported targets are as follows.

### Platform

The following platforms are supported:

| Platform                                        | Rust Target                 |
| ----------------------------------------------- | --------------------------- |
| 64-bit macOS (10.12+, Sierra+)                  | `x86_64-apple-darwin`       |
| ARM64 macOS (11.0+, Big Sur+)                   | `aarch64-apple-darwin`      |
| 64-bit MSVC (Windows 10+, Windows Server 2016+) | `x86_64-pc-windows-msvc`    |
| ARM64 Windows MSVC                              | `aarch64-pc-windows-msvc`   |
| 64-bit Linux (kernel 3.2+, glibc 2.17+)         | `x86_64-unknown-linux-gnu`  |
| ARM64 Linux (kernel 4.1, glibc 2.17+)           | `aarch64-unknown-linux-gnu` |

### Runtime

The following runtime are supported:

| Runtime | Import Specifier    |
| ------- | ------------------- |
| Deno    | `@miyauci/rfd/deno` |
| Node.js | `@miyauci/rfd/node` |

## API

See [jsr doc](https://jsr.io/@miyauci/rfd) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
