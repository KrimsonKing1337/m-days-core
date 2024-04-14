const fs = require('fs').promises;

const { readDirR } = require('./utils');
const { getPaths } = require('./utils');
const { makeDir, removeDir } = require('./utils');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * @param amount {number}
**/
async function randomFiles(amount = 100) {
  const { randomImagesSourcesPath, randomImagesTargetPath } = getPaths();

  removeDir(randomImagesTargetPath);
  makeDir(randomImagesTargetPath);

  const obj = {};

  const readDirResult = readDirR({
    path: randomImagesSourcesPath,
  });

  shuffleArray(readDirResult);

  for (let i = 0; i < readDirResult.length; i++) {
    const img = readDirResult[i];

    const indexStart = randomImagesSourcesPath.length;
    const targetSubFolder = img.fullPathWithoutName.substring(indexStart);

    const imgCurTargetDir = `${randomImagesTargetPath}/${targetSubFolder}`;

    if (!obj[targetSubFolder]) {
      obj[targetSubFolder] = 0;
    } else {
      const files = await fs.readdir(img.fullPathWithoutName);

      if (files < amount && files.length === obj[targetSubFolder]) {
        continue;
      }

      if (obj[targetSubFolder] === amount) {
        continue;
      }
    }

    const newFullName = `${imgCurTargetDir}/${img.nameWithoutExt}.${img.ext}`;

    makeDir(imgCurTargetDir);

    await fs.cp(img.fullPath, newFullName);

    console.log(`${img.name} copied to ${newFullName};`);

    obj[targetSubFolder] += 1;
  }
}

randomFiles(500);
