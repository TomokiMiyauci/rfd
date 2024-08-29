import { createRequire } from "node:module";
import { download } from "./cache.ts";
import { join } from "node:path";
import { arch, platform } from "node:process";
import { existsSync } from "node:fs";
import type { FileDialog as _FileDialog } from "./type.ts";
import { resolvePkgDir, resolvePlatformArchMap } from "./resolver.ts";
import {
  BASE_URL,
  BINARY_NAME,
  EXT,
  NAME,
  PKG_NAME,
  platformArch,
} from "./constant.ts";

const pkgRoot = await resolvePkgDir(PKG_NAME);
const binaryPath = join(pkgRoot, ".bin", BINARY_NAME);
const target = resolvePlatformArchMap(platformArch, platform, arch);
const require = createRequire(import.meta.url);

const url = BASE_URL + NAME + "-" + target + EXT;

if (!existsSync(binaryPath)) {
  await download(url, binaryPath);
}

const binding = require(binaryPath);

export interface FileDialogConstructor {
  new (): _FileDialog;
}

export const FileDialog: FileDialogConstructor = binding.FileDialog;
