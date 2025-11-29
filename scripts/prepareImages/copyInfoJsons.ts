import fs from 'fs/promises';
import path from 'path';

import { readDirR } from './utils';
import { getPaths } from './utils';

const paths = getPaths();

async function findFolderRecursive(startPath: string, folderName: string): Promise<string|null> {
  const entries = await fs.readdir(startPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(startPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === folderName) {
        return fullPath;
      }

      const result = await findFolderRecursive(fullPath, folderName);

      if (result) {
        return result;
      }
    }
  }

  return null;
}


// todo: do it for gifs as well
async function copyInfoJsons() {
  const { imagesSourcesPath, imagesTargetPath } = paths;

  const files = readDirR({
    path: imagesSourcesPath,
    formats: ['json'],
  });

  for (const fileCur of files) {
    const { subFolder, fullPath, name } = fileCur;

    const subFolderTarget = await findFolderRecursive(imagesTargetPath, subFolder);
    const jsonFilePath = path.join(subFolderTarget as string, name);

    await fs.cp(fullPath, jsonFilePath);
  }
}

copyInfoJsons();
