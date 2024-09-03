/** Dialog modules for Deno runtime.
 *
 * @module
 */

export { FileDialog, MessageDialog } from "./ffi.ts";
export { load } from "./generated.ts";
export {
  MessageButtons,
  type MessageDialogResult,
  MessageLevel,
} from "../generated.ts";
