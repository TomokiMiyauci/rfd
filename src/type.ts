export interface FileDialog {
  pickFile(): string | null;
  pickFolder(): string | null;
  pickFolders(): Array<string> | null;
  saveFile(): string | null;
  addFilter(name: string, extensions: Array<string>): this;
  pickFiles(): Array<string> | null;
  setFileName(fileName: string): this;
  setTitle(title: string): this;
  setCanCreateDirectories(can: boolean): this;
  setDirectory(path: string): this;
}
