const sharp = require('sharp');

const { getPaths } = require('./utils');
const { getMaxWidth } = require('./utils');
const { getRandomString } = require('./utils');

const { readDirR } = require('./utils');
const { makeDir } = require('./utils');
const { removeDir } = require('./utils');
const { getImageVariant } = require('./utils/index.js');

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

    this.allowSizes = [128, 240, 360, 480, 640, 1280, 1600, 1920, 2560, 3840, 5210, 7680];
    this.allowFormats = ['bmp', 'jng', 'jp2', 'jpc', 'jpeg', 'jpg', 'png', 'ptif', 'tiff', 'webp', 'avif'];
  }

  /**
   * @private
   * @returns {Array}
   */
  getImages() {
    return readDirR({
      path: this.imagesSourcesPath,
      formats: this.allowFormats
    });
  }

  /**
   * @private
   * @param img {object}
   * @property img.fullPath {string}
   * @returns {object || null}
   */
  async formatTarget(img) {
    let formattedImg = img;
    const sizes = [];

    let meta;

    try {
      meta = await sharp(img.fullPath).metadata();
    } catch (err) {
      console.error(err);

      return;
    }

    const { width, height } = meta;

    const variant = getImageVariant({width, height});

    formattedImg.size = {
      width,
      height,
    };

    // если ширина меньше 128 - то копируем без изменений
    if (width < 128) {
      sizes.push(width);

      return {
        img: formattedImg,
        sizes,
        tooSmall: true,
        variant,
      };
    }

    const delta = (width / height);

    if (delta < 1 || delta > 2) {
      const squareImg = await this.makeItSquare(formattedImg);

      if (squareImg !== false) {
        formattedImg = squareImg;

        console.log(`${img.fullPath} was cropped to square;`);
      } else {
        console.log(`${img.fullPath} is not valid due ratio;`);

        sizes.push(width);

        return {
          img: formattedImg,
          sizes,
          invalidRatio: true,
          variant,
        };
      }
    }

    const maxWidth = getMaxWidth(width);

    this.allowSizes.forEach((widthCur) => {
      if (maxWidth >= widthCur) {
        sizes.push(widthCur);
      }
    });

    return {
      img: formattedImg,
      sizes,
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
      await this.convertTargetEachSize(targetCur);
    }
  }

  /**
   * @property img {object}
   * @property img.fullPath {string}
   * @property img.nameWithoutExt {string}
   * @property img.size {object}
   * @returns {string || false}
   */
  async makeItSquare(img) {
    const { size } = img;

    const cropVal = size.height < size.width ? size.height : size.width;

    if (cropVal < 128) {
      return false;
    }

    const newName = getRandomString();
    const imgCurTargetDir = this.tempPath;
    const newFullName = `${imgCurTargetDir}/${newName}.jpg`;

    makeDir(imgCurTargetDir);

    try {
      await sharp(img.fullPath)
        .resize({ width: cropVal, height: cropVal, fit: 'cover' })
        .toFile(newFullName);
    } catch (err) {
      console.error(err);

      return;
    }

    const newSize = { width: cropVal, height: cropVal };

    return {
      ...img,
      size: newSize,
      fullPath: newFullName,
    };
  }

  /**
   * @param target {object}
   * @property target.img {object}
   * @property target.sizes {string[]}
   * @property target.invalidRatio {boolean}
   * @property target.variant {string}
   */
  async convertTargetEachSize({ img, sizes, invalidRatio, variant } = {}) {
    if (!img || !sizes) {
      return;
    }

    for (const sizeCur of sizes) {
      const newName = getRandomString();

      const indexStart = paths.imagesSourcesPath.length;
      const newSubFolder = img.fullPathWithoutName.substring(indexStart);

      let imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/${sizeCur}`;

      if (sizeCur < 128) {
        imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/100`;
      }

      if (invalidRatio) {
        imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/_invalid-ratio`;
      }

      const newFullName = `${imgCurTargetDir}/${newName}.jpg`;

      makeDir(imgCurTargetDir);

      await this.convert({
        img,
        size: sizeCur,
        variant,
        newName,
        newFullName,
      });
    }
  }

  /**
   * @param img {object}
   * @property img.fullPath {string}
   * @property img.name {string}
   * @property img.ext {string}
   * @param size {string}
   * @param variant {string}
   * @param newName {string}
   * @param newFullName {string}
   */
  async convert({ img, size, variant, newFullName } = {}) {
    const sizeAsNumber = Number(size);

    let options = {
      width: sizeAsNumber,
    }

    if (variant === 'v') {
      options = {
        height: sizeAsNumber,
      }
    }

    try {
      await sharp(img.fullPath, { limitInputPixels: false })
        // .grayscale()
        .resize(options)
        .toFile(newFullName);
    } catch (err) {
      console.error(err);

      return;
    }

    console.log(`${img.name} converted to ${newFullName}`);
  }

  async start() {
    removeDir(this.imagesTargetPath);
    makeDir(this.imagesTargetPath);

    const images = this.getImages();

    const targets = await this.formatEachTarget(images);

    await this.convertEachTarget(targets);

    removeDir(this.tempPath);

    console.log('done');
  }
}



const prepareImages = new PrepareImages({
  imagesSourcesPath: paths.imagesSourcesPath,
  imagesTargetPath: paths.imagesTargetPath,
  imagesTempPath: paths.imagesTempPath,
});

prepareImages.start();
