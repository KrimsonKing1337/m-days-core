import fs from 'fs';

/**
 *
 * @param dirPath {string}
 */
export function removeDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}
