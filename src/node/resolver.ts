import { lookupPackageScope } from "@miyauci/node-esm-resolution";
import { existsSync } from "node:fs";

export type PlatformArchMap = {
  [k in NodeJS.Platform]?: ArchMap;
};

export type ArchMap = {
  [k in NodeJS.Architecture]?: string;
};

export function resolvePlatformArchMap(
  map: PlatformArchMap,
  platform: NodeJS.Platform,
  arch: NodeJS.Architecture,
): string {
  if (platform in map && arch in map[platform]!) {
    return map[platform]![arch]!;
  }

  throw new Error(`Not supported. ${platform} ${arch}`);
}

export async function resolvePkgDir(fileURL: URL | string): Promise<string> {
  const scopeURL = await lookupPackageScope(fileURL, {
    existFile(url) {
      return existsSync(url);
    },
  });

  if (!scopeURL) {
    throw new Error(`Fail to resolve '${fileURL}' scope URL.`);
  }

  return scopeURL.pathname;
}

/** Try to resolve specifiers. */
export function resolves(specifiers: Iterable<string>): string | null {
  for (const specifier of specifiers) {
    try {
      return import.meta.resolve(specifier);
    } catch {
      //
    }
  }

  return null;
}
