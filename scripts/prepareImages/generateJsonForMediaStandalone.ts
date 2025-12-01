import fs from 'fs/promises';
import path from 'path';

import { getPaths } from './utils';

async function scanDir(baseDir: string, currentDir = '', result: string[] = []) {
  const fullPath = path.join(baseDir, currentDir);
  const entries = await fs.readdir(fullPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      await scanDir(baseDir, entryPath, result);
    } else {
      console.log('processing file', entryPath);

      result.push(entryPath);
    }
  }

  return result;
}

export async function generateJsonForMediaStandalone() {
  const { mediaStandalonePath, mediaStandaloneJsonPath } = getPaths();

  const files = await scanDir(mediaStandalonePath);

  const resultJson = JSON.stringify(files, null, 2);

  await fs.writeFile(mediaStandaloneJsonPath, resultJson);
}

generateJsonForMediaStandalone();
