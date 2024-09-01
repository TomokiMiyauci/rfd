/** Dialog modules for Deno runtime.
 *
 * @module
 */

export { FileDialog, load, MessageDialog } from "./ffi.ts";
export type {
  MessageButtons,
  MessageDialogResult,
  MessageLevel,
} from "../type.ts";
