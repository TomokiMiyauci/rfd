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
