import type { PlatformArchMap } from "./resolver.ts";
import json from "../../deno.json" with { type: "json" };

export const NAME = "rfd";
export const EXT = ".node";
export const BINARY_NAME = NAME + EXT;
export const BASE_URL =
  `https://github.com/TomokiMiyauci/rfd/releases/download/${json.version}/`;
export const platformArch = {
  darwin: { x64: "x86_64-apple-darwin", arm64: "aarch64-apple-darwin" },
  win32: { x64: "x86_64-pc-windows-msvc", arm64: "aarch64-pc-windows-msvc" },
  linux: {
    x64: "x86_64-unknown-linux-gnu",
    arm64: "aarch64-unknown-linux-gnu",
  },
} satisfies PlatformArchMap;
export const PKG_NAME = json.name + "/" + "node";
