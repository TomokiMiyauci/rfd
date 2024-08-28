import { createRequire } from "node:module";
import { download } from "./cache.ts";
import { join } from "node:path";
import { arch, platform } from "node:process";
import type { FileDialog as _FileDialog } from "./index.d.ts";
import json from "../../deno.json" with { type: "json" };
import { type PlatformArchMap, resolvePlatformArchMap } from "./resolver.ts";

const NAME = "rfd";
const EXT = ".node";
const BINARY_NAME = NAME + EXT;
const BASE_URL =
  `https://github.com/TomokiMiyauci/rfd/releases/download/${json.version}/`;
const platformArch = {
  darwin: { x64: "x86_64-apple-darwin", arm64: "aarch64-apple-darwin" },
  win32: { x64: "x86_64-pc-windows-msvc", arm64: "aarch64-pc-windows-msvc" },
} satisfies PlatformArchMap;

const require = createRequire(import.meta.url);
const pkgRoot = require.resolve(json.name);
const binaryPath = join(pkgRoot, ".bin", BINARY_NAME);
const target = resolvePlatformArchMap(platformArch, platform, arch);

const url = BASE_URL + NAME + "-" + target + EXT;

await download(url, binaryPath);

const binding = require(binaryPath);

export interface FileDialogConstructor {
  new (): _FileDialog;
}

export const FileDialog: FileDialogConstructor = binding.FileDialog;
