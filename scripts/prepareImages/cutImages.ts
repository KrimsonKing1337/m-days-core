import path from 'path';
import sharp from 'sharp';

import { makeDir, readDirR, removeDir } from './utils';

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test\\dynamic';
const imagesTargetPath = path.join(imagesSourcesPath, './_ready_cut');

const requiredWidth = 128;
const requiredHeight = 128;

export async function cutImages() {
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

    const metaWidth = meta.width as number;
    const metaHeight = meta.height as number;

    if (metaWidth < requiredWidth || metaHeight < requiredHeight) {
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
