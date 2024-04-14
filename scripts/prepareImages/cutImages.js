const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const { readDirR, removeDir, makeDir } = require('./utils');

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test\\dynamic';
const imagesTargetPath = path.join(imagesSourcesPath, './_ready_cut');

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

    const animated = imageCur.ext === 'gif';

    await sharp(imageCur.fullPath, { animated })
      .resize({ width: requiredWidth, height: requiredHeight, fit: 'cover' })
      .toFile(newFullName);

    console.log(`${imageCur.name} converted to ${newFullName}`);
  }

  console.log('done');
}

cutImages();

module.exports = { cutImages };
