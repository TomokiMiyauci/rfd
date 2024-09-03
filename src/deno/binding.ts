export const symbols = {
  __MessageDialog_new: {
    parameters: [],
    result: "pointer",
    nonblocking: false,
  },
  __MessageDialog_set_buttons: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __MessageDialog_set_level: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __MessageDialog_set_title: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __MessageDialog_set_description: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __MessageDialog_show: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __MessageDialog_dealloc: {
    parameters: [
      "pointer",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_new: {
    parameters: [],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_pick_file: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_pick_files: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_pick_folder: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_pick_folders: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_save_file: {
    parameters: [
      "pointer",
    ],
    result: "pointer",
    nonblocking: false,
  },
  __Dialog_set_directory: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_set_file_name: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_add_filter: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_set_title: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_set_can_create_directories: {
    parameters: [
      "pointer",
      "buffer",
      "usize",
    ],
    result: "void",
    nonblocking: false,
  },
  __Dialog_dealloc: {
    parameters: [
      "pointer",
    ],
    result: "void",
    nonblocking: false,
  },
} satisfies Deno.ForeignLibraryInterface;
