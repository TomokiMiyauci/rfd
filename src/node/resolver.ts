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
