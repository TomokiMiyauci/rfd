import { createRequire } from "node:module";
import { join } from "node:path";
import { existsSync } from "node:fs";
import { arch, platform } from "node:process";
import { resolvePkgDir, resolvePlatformArchMap, resolves } from "./resolver.ts";
import type {
  FileDialog as IFileDialog,
  MessageButtons,
  MessageButtonsJson,
  MessageDialog as IMessageDialog,
  MessageDialogResult,
  MessageLevel,
} from "../generated.ts";
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

/** Loading binary.
 *
 * To use all other modules, this must be called first.
 *
 * By default, remote binaries are fetched and cached.
 * Cache location is `node_modules/$PKG/.bin/`.
 *
 * To use local binaries, specify {@link path}.
 */
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

/** Synchronous File Dialog. */
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

/** Synchronous Message Dialog. */
export class MessageDialog implements IMessageDialog {
  #dialog: IMessageDialog;

  constructor() {
    this.#dialog = new binding.MessageDialog();
  }

  show(): MessageDialogResult {
    return this.#dialog.show();
  }

  setLevel(level: MessageLevel): this {
    this.#dialog.setLevel(level);

    return this;
  }

  setDescription(text: string): this {
    this.#dialog.setDescription(text);

    return this;
  }

  setTitle(title: string): this {
    this.#dialog.setTitle(title);

    return this;
  }

  setButtons(btn: MessageButtonsJson): this {
    const ref = toMsgButtons(btn, binding.MessageButtons);

    this.#dialog.setButtons(ref);

    return this;
  }
}

function toMsgButtons(
  btn: MessageButtonsJson,
  factory: MessageButtonFactory,
): MessageButtons {
  switch (btn.kind) {
    case "Ok":
      return factory.ok();
    case "OkCancel":
      return factory.okCancel();
    case "YesNo":
      return factory.yesNo();
    case "YesNoCancel":
      return factory.yesNoCancel();
    case "OkCustom":
      return factory.okCustom(btn.ok);
    case "OkCancelCustom":
      return factory.okCancelCustom(btn.ok, btn.cancel);
    case "YesNoCancelCustom":
      return factory.yesNoCancelCustom(btn.yes, btn.no, btn.cancel);
  }
}

export interface MessageButtonFactory {
  ok(): MessageButtons;
  yesNo(): MessageButtons;
  okCancel(): MessageButtons;
  yesNoCancel(): MessageButtons;
  okCustom(custom: string): MessageButtons;
  okCancelCustom(cancel: string, custom: string): MessageButtons;
  yesNoCancelCustom(no: string, cancel: string, custom: string): MessageButtons;
}
