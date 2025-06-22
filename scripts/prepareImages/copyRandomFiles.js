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

  const counter = {};

  const readDirResult = readDirR({
    path: randomImagesSourcesPath,
  });

  shuffleArray(readDirResult);

  for (let i = 0; i < readDirResult.length; i++) {
    const img = readDirResult[i];

    const indexStart = randomImagesSourcesPath.length;
    const targetSubFolder = img.fullPathWithoutName.substring(indexStart);

    const imgCurTargetDir = `${randomImagesTargetPath}/${targetSubFolder}`;

    if (!counter[targetSubFolder]) {
      counter[targetSubFolder] = 0;
    } else {
      const files = await fs.readdir(img.fullPathWithoutName);

      if (files.length < amount && files.length === counter[targetSubFolder]) {
        continue;
      }

      if (counter[targetSubFolder] === amount) {
        continue;
      }
    }

    const newFullName = `${imgCurTargetDir}/${img.name}`;

    makeDir(imgCurTargetDir);

    await fs.cp(img.fullPath, newFullName);

    console.log(`${img.name} copied to ${newFullName};`);

    counter[targetSubFolder] += 1;
  }

  console.log('done');
}

randomFiles(100);
