/** Dialog modules for Node.js runtime.
 *
 * @module
 */

export { FileDialog, MessageDialog } from "./ffi.ts";
export { load } from "./generated.ts";
export type {
  MessageButtons,
  MessageDialogResult,
  MessageLevel,
} from "../type.ts";
