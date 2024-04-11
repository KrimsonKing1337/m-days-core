const fs = require('fs').promises;

const { readDirR } = require('./utils');
const { getPaths } = require('./utils');
const { makeDir } = require('./utils/index.js');

/**
 * @param amount {number}
**/
async function randomFiles(amount = 100) {
  const { imagesSourcesPath, imagesTargetPath, imagesTempPath } = getPaths();

  const obj = {};

  const readDirResult = readDirR({
    path: imagesSourcesPath,
  });

  for (let i = 0; i < readDirResult.length; i++) {
    const img = readDirResult[i];

    const indexStart = imagesSourcesPath.length;
    const targetSubFolder = img.fullPathWithoutName.substring(indexStart);

    const imgCurTargetDir = `${imagesTargetPath}/${targetSubFolder}`;

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

    // todo: это пока не рандомные файлы, это первые 100 файлов

    console.log(`${img.name} copied to ${newFullName};`);

    obj[targetSubFolder] += 1;
  }
}

randomFiles();

module.exports = { randomFiles };
