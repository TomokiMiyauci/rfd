// deno-lint-ignore-file

import { dlopen } from "@denosaurs/plug";
import { symbols as fli } from "./binding.ts";
import { options } from "./constant.ts";

let symbols: any;

/** Loading binary.
 *
 * To use all other modules, this must be called first.
 *
 * By default, remote binaries are fetched and cached.
 *
 * To use local binaries, specify {@link path}.
 */
export async function load(path?: string): Promise<void> {
  if (typeof path === "string") {
    const result = Deno.dlopen(path, fli);

    symbols = result.symbols;

    return;
  }

  const result = await dlopen(options, fli);

  symbols = result.symbols;
}

function __MessageDialog_new(): MessageDialog {
  const ret = symbols.__MessageDialog_new();
  return MessageDialog.__constructor(ret);
}

function __MessageDialog_set_buttons(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__MessageDialog_set_buttons(
    arg0,
    arg1,
    arg1.byteLength,
  );
}

function __MessageDialog_set_level(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__MessageDialog_set_level(
    arg0,
    arg1,
    arg1.byteLength,
  );
}

function __MessageDialog_set_title(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__MessageDialog_set_title(
    arg0,
    arg1,
    arg1.byteLength,
  );
}

function __MessageDialog_set_description(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__MessageDialog_set_description(
    arg0,
    arg1,
    arg1.byteLength,
  );
}

function __MessageDialog_show(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__MessageDialog_show(
    arg0,
  );
}

function __MessageDialog_dealloc(
  arg0: Deno.PointerObject | null,
): void {
  return symbols.__MessageDialog_dealloc(
    arg0,
  );
}

export class MessageDialog {
  ptr: Deno.PointerObject | null = null;

  static __constructor(ptr: Deno.PointerObject | null) {
    const self = Object.create(MessageDialog.prototype);
    self.ptr = ptr;
    return self;
  }

  [Symbol.dispose]() {
    this.dealloc();
    this.ptr = null;
  }

  constructor() {
    return __MessageDialog_new();
  }

  set_buttons(arg0: Uint8Array): void {
    return __MessageDialog_set_buttons(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_level(arg0: Uint8Array): void {
    return __MessageDialog_set_level(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_title(arg0: Uint8Array): void {
    return __MessageDialog_set_title(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_description(arg0: Uint8Array): void {
    return __MessageDialog_set_description(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  show(): Deno.PointerObject | null {
    return __MessageDialog_show(
      this.ptr,
    );
  }

  dealloc(): void {
    return __MessageDialog_dealloc(
      this.ptr,
    );
  }
}

function __Dialog_new(): Dialog {
  const ret = symbols.__Dialog_new();
  return Dialog.__constructor(ret);
}

function __Dialog_pick_file(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__Dialog_pick_file(
    arg0,
  );
}

function __Dialog_pick_files(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__Dialog_pick_files(
    arg0,
  );
}

function __Dialog_pick_folder(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__Dialog_pick_folder(
    arg0,
  );
}

function __Dialog_pick_folders(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__Dialog_pick_folders(
    arg0,
  );
}

function __Dialog_save_file(
  arg0: Deno.PointerObject | null,
): Deno.PointerObject | null {
  return symbols.__Dialog_save_file(
    arg0,
  );
}

function __Dialog_set_directory(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__Dialog_set_directory(
    arg0,
    arg1,
    // @ts-ignore
    arg1.byteLength,
  );
}

function __Dialog_set_file_name(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__Dialog_set_file_name(
    arg0,
    arg1,
    // @ts-ignore
    arg1.byteLength,
  );
}

function __Dialog_add_filter(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__Dialog_add_filter(
    arg0,
    arg1,
    arg1.byteLength,
  );
}

function __Dialog_set_title(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__Dialog_set_title(
    arg0,
    arg1,
    // @ts-ignore
    arg1.byteLength,
  );
}

function __Dialog_set_can_create_directories(
  arg0: Deno.PointerObject | null,
  arg1: Uint8Array,
): void {
  return symbols.__Dialog_set_can_create_directories(
    arg0,
    arg1,
    // @ts-ignore
    arg1.byteLength,
  );
}

function __Dialog_dealloc(
  arg0: Deno.PointerObject | null,
): void {
  return symbols.__Dialog_dealloc(
    arg0,
  );
}

export class Dialog {
  ptr: Deno.PointerObject | null = null;

  static __constructor(ptr: Deno.PointerObject | null) {
    const self = Object.create(Dialog.prototype);
    self.ptr = ptr;
    return self;
  }

  [Symbol.dispose]() {
    this.dealloc();
    this.ptr = null;
  }

  constructor() {
    return __Dialog_new();
  }

  pick_file(): Deno.PointerObject | null {
    return __Dialog_pick_file(
      this.ptr,
    );
  }

  pick_files(): Deno.PointerObject | null {
    return __Dialog_pick_files(
      this.ptr,
    );
  }

  pick_folder(): Deno.PointerObject | null {
    return __Dialog_pick_folder(
      this.ptr,
    );
  }

  pick_folders(): Deno.PointerObject | null {
    return __Dialog_pick_folders(
      this.ptr,
    );
  }

  save_file(): Deno.PointerObject | null {
    return __Dialog_save_file(
      this.ptr,
    );
  }

  set_directory(arg0: Uint8Array): void {
    return __Dialog_set_directory(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_file_name(arg0: Uint8Array): void {
    return __Dialog_set_file_name(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  add_filter(arg0: Uint8Array): void {
    return __Dialog_add_filter(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_title(arg0: Uint8Array): void {
    return __Dialog_set_title(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  set_can_create_directories(arg0: Uint8Array): void {
    return __Dialog_set_can_create_directories(
      this.ptr,
      arg0,
      // @ts-ignore
      arg0.byteLength,
    );
  }

  dealloc(): void {
    return __Dialog_dealloc(
      this.ptr,
    );
  }
}
