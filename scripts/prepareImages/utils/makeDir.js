import fs from 'fs';

/**
 *
 * @param path {string}
 */
export function makeDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}
