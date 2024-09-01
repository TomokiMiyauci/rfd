import type { FileDialog as IFileDialog } from "../type.ts";
import { createRequire } from "node:module";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { arch, platform } from "node:process";
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
import { download } from "./cache.ts";

// deno-lint-ignore no-explicit-any
let binding: any;

export async function load(path?: string): Promise<void> {
  const require = createRequire(import.meta.url);

  if (typeof path === "string") {
    binding = require(path);
    return;
  }

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

  if (!existsSync(binaryPath)) {
    const target = resolvePlatformArchMap(platformArch, platform, arch);

    const url = BASE_URL + NAME + "-" + target + EXT;

    await download(url, binaryPath);
  }

  binding = require(binaryPath);
}

export class FileDialog implements IFileDialog {
  #dialog: IFileDialog;
  constructor() {
    this.#dialog = new binding.FileDialog();
  }

  pickFile(): string | null {
    return this.#dialog.pickFile();
  }

  pickFiles(): string[] | null {
    return this.#dialog.pickFiles();
  }

  pickFolder(): string | null {
    return this.#dialog.pickFolder();
  }

  pickFolders(): string[] | null {
    return this.#dialog.pickFolders();
  }

  saveFile(): string | null {
    return this.#dialog.saveFile();
  }

  setTitle(title: string): this {
    this.#dialog.setTitle(title);

    return this;
  }

  setFileName(fileName: string): this {
    this.#dialog.setFileName(fileName);

    return this;
  }

  setDirectory(path: string): this {
    this.#dialog.setDirectory(path);

    return this;
  }

  setCanCreateDirectories(can: boolean): this {
    this.#dialog.setCanCreateDirectories(can);

    return this;
  }

  addFilter(name: string, extensions: Array<string>): this {
    this.#dialog.addFilter(name, extensions);

    return this;
  }
}
