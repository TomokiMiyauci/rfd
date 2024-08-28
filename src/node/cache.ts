import { Buffer } from "node:buffer";
import { writeFile } from "npm:write-file-safe";

export async function download(url: string | URL, dest: string): Promise<void> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFile(dest, buffer, { appendNewline: false });
}
