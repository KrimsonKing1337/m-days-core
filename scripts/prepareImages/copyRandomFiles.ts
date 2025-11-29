import fs from 'fs/promises';

import { readDirR } from './utils';
import { getPaths } from './utils';
import { makeDir, removeDir } from './utils';

function shuffleArray(array: unknown[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function randomFiles(amount = 100) {
  const { randomImagesSourcesPath, randomImagesTargetPath } = getPaths();

  removeDir(randomImagesTargetPath);
  makeDir(randomImagesTargetPath);

  const counter: Record<string, number> = {};

  const readDirResult = readDirR({
    path: randomImagesSourcesPath, // media files and info.jsons as well
  });

  shuffleArray(readDirResult);

  for (let i = 0; i < readDirResult.length; i++) {
    const fileCur = readDirResult[i];

    const indexStart = randomImagesSourcesPath.length;
    const targetSubFolder = fileCur.fullPathWithoutName.substring(indexStart);

    const imgCurTargetDir = `${randomImagesTargetPath}/${targetSubFolder}`;

    if (!counter[targetSubFolder]) {
      counter[targetSubFolder] = 0;
    } else {
      const files = await fs.readdir(fileCur.fullPathWithoutName);

      if (files.length < amount && files.length === counter[targetSubFolder]) {
        continue;
      }

      if (counter[targetSubFolder] === amount) {
        continue;
      }
    }

    const newFullName = `${imgCurTargetDir}/${fileCur.name}`;

    makeDir(imgCurTargetDir);

    await fs.cp(fileCur.fullPath, newFullName);

    console.log(`${fileCur.name} copied to ${newFullName};`);

    counter[targetSubFolder] += 1;
  }

  console.log('done');
}

randomFiles(100);
