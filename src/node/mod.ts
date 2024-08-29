import { createRequire } from "node:module";
import { download } from "./cache.ts";
import { join } from "node:path";
import { arch, platform } from "node:process";
import { existsSync } from "node:fs";
import type { FileDialog as _FileDialog } from "../type.ts";
import { resolvePkgDir, resolvePlatformArchMap, resolves } from "./resolver.ts";
import {
  BASE_URL,
  BINARY_NAME,
  EXT,
  JSR_NAME,
  NAME,
  PKG_NAME,
  platformArch,
} from "./constant.ts";

// Binaries are in remote and are cached at the time of use.
// The cache is stored in `node_modules/pkg/.bin`.

// Resolve the `node_modules` path in pkg.
// If used as a dependency, jsr modules are installed as a module with `@jsr` as its scope.
// Therefore, try to resolve modules with `@miyauci/rfd/node` and `@jsr/miyauci__rfd/node` as specifier.
// TODO: Change to a better way

const fileURL = resolves([PKG_NAME, JSR_NAME]);

if (!fileURL) {
  throw new Error(
    `[ERR_MODULE_NOT_FOUND]: Cannot find package '${PKG_NAME}' and '${JSR_NAME}'`,
  );
}

const pkgRoot = await resolvePkgDir(fileURL);
const binaryPath = join(pkgRoot, ".bin", BINARY_NAME);
const target = resolvePlatformArchMap(platformArch, platform, arch);
const require = createRequire(import.meta.url);

if (!existsSync(binaryPath)) {
  const url = BASE_URL + NAME + "-" + target + EXT;

  await download(url, binaryPath);
}

const binding = require(binaryPath);

export interface FileDialogConstructor {
  new (): _FileDialog;
}

export const FileDialog: FileDialogConstructor = binding.FileDialog;
