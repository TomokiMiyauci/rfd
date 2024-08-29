import { Dialog } from "./generated.ts";

type Result<T> = Success<T> | Failure;

interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
}

export class FileDialog {
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

  pickDirectory(): string | null {
    const ptr = this.#dialog.pick_directory();
    const ptrView = new Deno.UnsafePointerView(ptr!);
    const jsonStr = ptrView.getCString();
    const result = JSON.parse(jsonStr) as Result<string>;

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

  addFilter(_: string, extensions: string[]): void {
    const extensionsStr = JSON.stringify(extensions);
    const ext = new TextEncoder().encode(extensionsStr);
    const dialog = this.#dialog.add_filter(ext);

    this.#update(dialog);
  }

  setDirectory(path: string): this {
    const u8 = new TextEncoder().encode(path);
    const dialog = this.#dialog.set_directory(u8);

    this.#update(dialog);

    return this;
  }

  setFileName(fileName: string): this {
    const u8 = new TextEncoder().encode(fileName);
    const dialog = this.#dialog.set_file_name(u8);

    this.#update(dialog);

    return this;
  }

  #release(): void {
    this.#dialog[Symbol.dispose]();
  }

  #update(dialog: Dialog): void {
    this.#release();

    this.#dialog = dialog;
  }

  [Symbol.dispose](): void {
    this.#release();
  }
}
