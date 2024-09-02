/** Dialog modules for Deno runtime.
 *
 * @module
 */

export { FileDialog, load, MessageDialog } from "./ffi.ts";
export {
  MessageButtons,
  type MessageDialogResult,
  MessageLevel,
} from "../generated.ts";
