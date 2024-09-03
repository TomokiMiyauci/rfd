import type { FetchOptions } from "@denosaurs/plug";
import json from "../../deno.json" with { type: "json" };

const NAME = "rfd";
export const BASE_URL =
  `https://github.com/TomokiMiyauci/rfd/releases/download/${json.version}/`;

export const options = {
  name: NAME,
  url: BASE_URL,
  prefixes: { aarch64: "", x86_64: "" },
  suffixes: {
    darwin: {
      aarch64: "-aarch64-apple-darwin",
      x86_64: "-x86_64-apple-darwin",
    },
    linux: {
      aarch64: "-aarch64-unknown-linux-gnu",
      x86_64: "-x86_64-unknown-linux-gnu",
    },
    windows: {
      aarch64: "-aarch64-pc-windows-msvc",
      x86_64: "-x86_64-pc-windows-msvc",
    },
  },
} satisfies FetchOptions;
