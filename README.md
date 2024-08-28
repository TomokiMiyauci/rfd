# rfd

File dialog, port of [Rust rfd](https://github.com/PolyMeilex/rfd).

## Install

node:

```bash
npx jsr add @miyauci/fs
```

## Usage

```ts
import { FileDialog } from "@miyauci/rfd/$RUNTIME";

const dialog = new FileDialog();
const path = dialog.pickFile();
```

### Supported Runtime

| Runtime | Import Specifier    |
| ------- | ------------------- |
| Node.js | `@miyauci/rfd/node` |

## API

See [jsr doc](https://jsr.io/@miyauci/rfd) for all APIs.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE) © 2024 Tomoki Miyauchi
