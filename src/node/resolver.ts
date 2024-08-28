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

export async function resolvePkgDir(moduleName: string): Promise<string> {
  const url = import.meta.resolve(moduleName);

  const scopeURL = await lookupPackageScope(url, {
    existFile(url) {
      return existsSync(url);
    },
  });

  if (!scopeURL) {
    throw new Error(`Fail to resolve "${moduleName}" node_modules path`);
  }

  return scopeURL.pathname;
}
