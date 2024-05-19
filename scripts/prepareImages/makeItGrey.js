const sharp = require('sharp');

const { readDirR } = require('./utils');

const dir = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images_originals\\static\\default\\common\\0';

async function makeItGrey() {
  const allowFormats = ['bmp', 'gif', 'jng', 'jp2', 'jpc', 'jpeg', 'jpg', 'png', 'ptif', 'tiff'];

  const files = readDirR({ path: dir, formats: allowFormats });

  for (let i = 0; i < files.length; i++) {
    const fileCur = files[i];

    const { fullPath } = fileCur;

    // sharp не умеет перезаписывать файлы из-за особенностей работы кэша,
    // поэтому мы сначала отправляем результат в буфер, а оттуда уже в файл
    const buffer = await sharp(fullPath).grayscale().toBuffer();

    await sharp(buffer).toFile(fullPath);
  }
}

makeItGrey();
