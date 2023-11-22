const sharp = require('sharp');

const { getPaths } = require('./utils');
const { getRandomString } = require('./utils');

const { readDirR } = require('./utils');
const { makeDir } = require('./utils');
const { removeDir } = require('./utils');
const { getGifVariant } = require('./utils');

const paths = getPaths();

class PrepareImages {
  /**
   *
   * @param imagesSourcesPath {string}
   * @param imagesTargetPath {string}
   * @param imagesTempPath {string}
   */
  constructor({ imagesSourcesPath, imagesTargetPath, imagesTempPath } = {}) {
    this.imagesSourcesPath = imagesSourcesPath;
    this.imagesTargetPath = imagesTargetPath;
    this.tempPath = imagesTempPath;
  }

  /**
   * @private
   * @returns {Array}
   */
  getImages() {
    return readDirR({
      path: this.imagesSourcesPath,
    });
  }

  /**
   * @private
   * @param img {object}
   * @property img.fullPath {string}
   * @returns {object || null}
   */
  async formatTarget(img) {
    let formattedImg = { ...img };
    let size = 640;

    const { fullPath } = formattedImg;

    const variant = getGifVariant(fullPath);

    const meta = await sharp(fullPath).metadata();

    const { width, height } = meta;

    formattedImg.size = {
      width,
      height,
    };

    if (width < 640) {
      size = width;
    }

    return {
      img: formattedImg,
      size,
      variant,
    };
  }

  /**
   * @private
   * @param images[] {object}; collection of images
   * @returns {Promise<object[]>};
   */
  async formatEachTarget(images) {
    const targets = [];

    for (const imgCur of images) {
      const formattedTarget = await this.formatTarget(imgCur);

      targets.push(formattedTarget);
    }

    return targets.filter((targetCur) => targetCur !== null);
  }

  /**
   * @private
   * @param targets[] {object}; collection of targets
   */
  async convertEachTarget(targets) {
    for (const targetCur of targets) {
      await this.convertTarget(targetCur);
    }
  }

  /**
   * @param target {object}
   * @property target.img {object}
   * @property target.variant {string}
   * @property target.size {string}
   */
  async convertTarget({ img, size, variant } = {}) {
    const newName = getRandomString();
    const imgCurTargetDir = `${this.imagesTargetPath}/${variant}`;
    const newFullName = `${imgCurTargetDir}/${newName}.gif`;

    makeDir(imgCurTargetDir);

    await this.convert({
      img,
      size,
      variant,
      newName,
      newFullName,
    });
  }

  /**
   * @param img {object}
   * @property img.fullPath {string}
   * @property img.name {string}
   * @property img.ext {string}
   * @param size {string}
   * @param newName {string}
   * @param newFullName {string}
   */
  async convert({ img, size, newFullName } = {}) {
    const width = Number(size);

    await sharp(img.fullPath, { animated: true })
      .resize({ width })
      .toFile(newFullName);

    console.log(`${img.name} converted to ${newFullName};`);
  }

  async start() {
    removeDir(this.imagesTargetPath);
    makeDir(this.imagesTargetPath);

    const images = this.getImages();

    // убираю аватарки фотографов
    const imagesWithoutAvatars = images.filter((imgCur) => {
      const { name } = imgCur;

      return !name.includes('avatar');
    });

    const targets = await this.formatEachTarget(imagesWithoutAvatars);

    await this.convertEachTarget(targets);

    removeDir(this.tempPath);

    console.log('done');
  }
}



const prepareImages = new PrepareImages({
  imagesSourcesPath: paths.gifsSourcesPath,
  imagesTargetPath: paths.gifsTargetPath,
  imagesTempPath: paths.gifsTempPath,
});

prepareImages.start();
