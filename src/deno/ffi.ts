import { Dialog } from "./generated.ts";
import type { FileDialog as _FileDialog } from "../type.ts";

type Result<T> = Success<T> | Failure;

interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
}

export class FileDialog implements _FileDialog {
  #dialog: Dialog = new Dialog();

  pickFile(): string | null {
    const ptr = this.#dialog.pick_file();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const fullPath = ptrView.getCString();
    const json = JSON.parse(fullPath) as Result<string>;

    if (json.success) return json.data;

    return null;
  }

  pickFiles(): string[] | null {
    const ptr = this.#dialog.pick_files();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const jsonStr = ptrView.getCString();
    const result = JSON.parse(jsonStr) as Result<string[]>;

    if (result.success) return result.data;

    return null;
  }

  pickFolder(): string | null {
    const ptr = this.#dialog.pick_folder();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const jsonStr = ptrView.getCString();
    const result = JSON.parse(jsonStr) as Result<string>;

    if (result.success) return result.data;

    return null;
  }

  pickFolders(): Array<string> | null {
    const ptr = this.#dialog.pick_folders();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const jsonStr = ptrView.getCString();
    const result = JSON.parse(jsonStr) as Result<string[]>;

    if (result.success) return result.data;

    return null;
  }

  saveFile(): string | null {
    const ptr = this.#dialog.save_file();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const jsonStr = ptrView.getCString();
    const result = JSON.parse(jsonStr) as Result<string>;

    if (result.success) return result.data;

    return null;
  }

  addFilter(_: string, extensions: string[]): this {
    const extensionsStr = JSON.stringify(extensions);
    const ext = new TextEncoder().encode(extensionsStr);

    this.#dialog.add_filter(ext);

    return this;
  }

  setDirectory(path: string): this {
    const u8 = new TextEncoder().encode(path);

    this.#dialog.set_directory(u8);

    return this;
  }

  setFileName(fileName: string): this {
    const u8 = new TextEncoder().encode(fileName);

    this.#dialog.set_file_name(u8);

    return this;
  }

  setTitle(title: string): this {
    const u8 = new TextEncoder().encode(title);

    this.#dialog.set_title(u8);

    return this;
  }

  setCanCreateDirectories(can: boolean): this {
    const str = JSON.stringify(can);
    const u8 = new TextEncoder().encode(str);

    this.#dialog.set_can_create_directories(u8);

    return this;
  }

  [Symbol.dispose](): void {
    this.#dialog[Symbol.dispose]();
  }
}
