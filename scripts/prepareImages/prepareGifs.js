const sharp = require('sharp');
const fs = require('fs').promises;

const { getPaths } = require('./utils');
const { getRandomString } = require('./utils');

const { readDirR } = require('./utils');
const { makeDir } = require('./utils');
const { removeDir } = require('./utils');
const { getImageVariant } = require('./utils');
const { getMaxWidth } = require('./utils');

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
    this.allowFormats = ['gif'];
  }

  /**
   * @private
   * @returns {Array}
   */
  getImages() {
    return readDirR({
      path: this.imagesSourcesPath,
      allowFormats: this.allowFormats,
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

    const { fullPath } = formattedImg;

    let meta;

    try {
      meta = await sharp(fullPath).metadata();
    } catch (err) {
      console.error(err);

      return;
    }

    const { width, height, size } = meta;

    const variant = getImageVariant({width, height});

    formattedImg.size = {
      width,
      height,
    };

    if (width < 128) {
      sizes.push(width);

      return {
        img: formattedImg,
        sizes,
        tooSmall: true,
        variant,
      };
    }

    // 3mb
    if (size > 3000000) {
      sizes.push(width);

      return {
        img: formattedImg,
        sizes,
        tooHeavy: true,
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
      await sharp(img.fullPath, { animated: true })
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

  async convertTargetEachSize({ img, sizes, variant, invalidRatio, tooHeavy } = {}) {
    if (!sizes) {
      return;
    }

    for (const sizeCur of sizes) {
      const newName = getRandomString();

      const indexStart = paths.gifsSourcesPath.length;
      const newSubFolder = img.fullPathWithoutName.substring(indexStart);

      let imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/${sizeCur}`;

      if (sizeCur < 128) {
        imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/100`;
      }

      if (invalidRatio) {
        imgCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}/${variant}/_invalid-ratio`;
      }

      const newFullName = `${imgCurTargetDir}/${newName}.gif`;

      makeDir(imgCurTargetDir);

      // если гифка больше 3мб - пропускаем её
      if (tooHeavy) {
        continue;
      }

      if (sizeCur < 128) {
        await fs.cp(img.fullPath, newFullName);

        console.log(`${img.name} copied to ${newFullName};`);

        continue;
      }

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
      await sharp(img.fullPath, { animated: true, limitInputPixels: false })
        .resize(options)
        .toFile(newFullName);
    } catch (err) {
      console.error(err);

      return;
    }

    console.log(`${img.name} converted to ${newFullName};`);
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
  imagesSourcesPath: paths.gifsSourcesPath,
  imagesTargetPath: paths.gifsTargetPath,
  imagesTempPath: paths.gifsTempPath,
});

prepareImages.start();
