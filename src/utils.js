import { resolve, parse, sep } from 'path';

export function printCurrentDirectory(dir) {
  console.log(`You are currently in ${dir}`);
}

export function resolvePath(currentDir, targetPath) {
  return resolve(currentDir, targetPath);
}

export function isRoot(dir) {
  const parsed = parse(dir);
  return parsed.root === dir;
}

export function getParentDirectory(dir) {
  if (isRoot(dir)) {
    return dir;
  }
  return resolve(dir, '..');
}

