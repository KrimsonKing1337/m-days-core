const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const { readDirR, removeDir, makeDir } = require('./utils');

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test\\static';
const imagesTargetPath = path.join(imagesSourcesPath, './_ready');

const requiredWidth = 128;
const requiredHeight = 128;

async function cutImages() {
  removeDir(imagesTargetPath);
  makeDir(imagesTargetPath);

  const images = readDirR({
    path: imagesSourcesPath,
    formats: ['jpg', 'gif'],
  });

  for (const imageCur of images) {
    const meta = await sharp(imageCur.fullPath).metadata();

    const indexStart = imagesSourcesPath.length;
    const newSubFolder = imageCur.fullPathWithoutName.substring(indexStart);

    const imgCurTargetDir = `${imagesTargetPath}/${newSubFolder}`;

    makeDir(imgCurTargetDir);

    const newFullName = `${imgCurTargetDir}/${imageCur.name}`;

    const { width, height } = meta;

    if (width < requiredWidth || height < requiredHeight) {
      continue;
    }

    await sharp(imageCur.fullPath)
      .resize({ width: requiredWidth, height: requiredHeight, fit: 'cover' })
      .toFile(newFullName);

    console.log(`${imageCur.name} converted to ${newFullName}`);
  }

  console.log('done');
}

cutImages();

module.exports = { cutImages };
