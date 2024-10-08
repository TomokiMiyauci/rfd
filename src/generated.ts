/** Synchronous File Dialog. */
export interface FileDialog {
  /** Pick one file
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.pick_file)
   */
  pickFile(): string | null;

  /** Pick one folder
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.pick_folder)
   */
  pickFolder(): string | null;

  /** Pick multiple folders
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.pick_folders)
   */
  pickFolders(): Array<string> | null;

  /** Opens save file dialog
   *
   * Platform specific notes regarding save dialog filters:
   *
   * - On macOS
   *    - If filter is set, all files will be grayed out (no matter the extension sadly)
   *    - If user does not type an extension MacOs will append first available extension from filters list
   *    - If user types in filename with extension MacOs will check if it exists in filters list, if not it will display appropriate message
   * - On GTK
   *    - It only filters which already existing files get shown to the user
   *    - It does not append extensions automatically
   *    - It does not prevent users from adding any unsupported extension
   * - On Win:
   *    - If no extension was provided it will just add currently selected one
   *    - If selected extension was typed in by the user it will just return
   *    - If unselected extension was provided it will append selected one at the end, example: `test.png.txt`
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.save_file)
   */
  saveFile(): string | null;

  /** Add file extension filter.
   * Takes in the {@link name} of the filter, and list of {@link extensions}.
   *
   * The name of the filter will be displayed on supported platforms:
   * - Windows
   * - Linux
   *
   * On platforms that don’t support filter names, all filters will be merged into one filter
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.add_filter)
   */
  addFilter(name: string, extensions: Array<string>): this;

  /** Pick multiple files
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.pick_files)
   */
  pickFiles(): Array<string> | null;

  /** Set starting file name of the dialog. Supported platforms:
   *
   * - Windows
   * - Linux
   * - Mac
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.set_file_name)
   */
  setFileName(fileName: string): this;

  /** Set the title of the dialog. Supported platforms:
   *
   * - Windows
   * - Linux
   * - Mac
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.set_title)
   */
  setTitle(title: string): this;

  /** Set can create directories in the dialog. Supported in: `macos`.
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.set_can_create_directories)
   */
  setCanCreateDirectories(can: boolean): this;

  /** Set starting directory of the dialog. Supported platforms:
   *
   * - Linux ([GTK only](https://github.com/PolyMeilex/rfd/issues/42))
   * - Windows
   * - Mac
   *
   * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/struct.FileDialog.html#method.set_directory)
   */
  setDirectory(path: string): this;
}

/** Synchronous Message Dialog. */
export interface MessageDialog {
  /** Shows a message dialog and returns the button that was pressed.
   *
   * [DOCS.RS](https://docs.rs/rfd/latest/rfd/struct.MessageDialog.html#method.show)
   */
  show(): MessageDialogResult;

  /** Set level of a dialog
   *
   * Depending on the system it can result in level specific icon to show up, the will inform user it message is a error, warning or just information.
   *
   * [DOCS.RS](https://docs.rs/rfd/latest/rfd/struct.MessageDialog.html#method.set_level)
   */
  setLevel(level: MessageLevel): this;

  /** Set title of a dialog
   *
   * [DOCS.RS](https://docs.rs/rfd/latest/rfd/struct.MessageDialog.html#method.set_title)
   */
  setTitle(title: string): this;

  /** Set description of a dialog
   *
   * Description is a content of a dialog
   *
   * [DOCS.RS](https://docs.rs/rfd/latest/rfd/struct.MessageDialog.html#method.set_description)
   */
  setDescription(text: string): this;

  /** Set the set of button that will be displayed on the dialog
   *
   * - `Ok` dialog is a single `Ok` button
   * - `OkCancel` dialog, will display 2 buttons: ok and cancel.
   * - `YesNo` dialog, will display 2 buttons: yes and no.
   * - `YesNoCancel` dialog, will display 3 buttons: yes, no, and cancel.
   *
   * [DOCS.RS](https://docs.rs/rfd/latest/rfd/struct.MessageDialog.html#method.set_buttons)
   */
  setButtons(btn: MessageButtons): this;
}

/** Message button javascript notation. */
export type MessageButtonsJson =
  | { kind: "Ok" }
  | { kind: "OkCancel" }
  | { kind: "YesNo" }
  | { kind: "YesNoCancel" }
  | { kind: "OkCustom"; ok: string }
  | { kind: "OkCancelCustom"; ok: string; cancel: string }
  | { kind: "YesNoCancelCustom"; yes: string; no: string; cancel: string };

/** Message dialog result javascript notation.
 *
 * [DOCS.RS](https://docs.rs/rfd/latest/rfd/enum.MessageDialogResult.html)
 */
export type MessageDialogResult =
  | { kind: "Ok" }
  | { kind: "Yes" }
  | { kind: "No" }
  | { kind: "Cancel" }
  | { kind: "Custom"; value: string };

/**
 * [DOCS.RS](https://docs.rs/rfd/0.14.1/rfd/enum.MessageButtons.html)
 */
export class MessageButtons {
  static Ok: MessageButtonsJson = {
    kind: "Ok",
  };

  static YesNo: MessageButtonsJson = {
    kind: "YesNo",
  };

  static OkCancel: MessageButtonsJson = {
    kind: "OkCancel",
  };

  static YesNoCancel: MessageButtonsJson = {
    kind: "YesNoCancel",
  };

  /** One customizable button. */
  static OkCustom(ok: string): MessageButtonsJson {
    return { kind: "OkCustom", ok };
  }

  /** Two customizable buttons.  */
  static OkCancelCustom(ok: string, cancel: string): MessageButtonsJson {
    return { kind: "OkCancelCustom", ok, cancel };
  }

  /** Three customizable buttons. */
  static YesNoCancelCustom(
    yes: string,
    no: string,
    cancel: string,
  ): MessageButtonsJson {
    return { kind: "YesNoCancelCustom", yes, no, cancel };
  }
}

/** Message level.
 *
 * [DOCS.RS](https://docs.rs/rfd/latest/rfd/enum.MessageLevel.html)
 */
export enum MessageLevel {
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}
