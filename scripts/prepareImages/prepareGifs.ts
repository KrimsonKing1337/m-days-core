import sharp from 'sharp';
import fs from 'fs/promises';

import { type FileInfo } from './utils/getFileInfo';
import { getPaths } from './utils';
import { getRandomString } from './utils';
import { readDirR } from './utils';
import { makeDir } from './utils';
import { removeDir } from './utils';
import { getImageVariant } from './utils';
import { getMaxWidth } from './utils';

const paths = getPaths();

type PrepareImagesArgs = {
  imagesSourcesPath: string;
  imagesTargetPath: string;
  imagesTempPath: string;
};

type FormattedImage = FileInfo & {
  size: {
    width: number;
    height: number;
  }
};

type Target = {
  img: FormattedImage;
  sizes: number[];
  tooSmall?: boolean;
  invalidRatio?: boolean;
  variant: string;
};

type TargetOrUndefined = Target | undefined;

type TargetForConvert = {
  img: FormattedImage;
  variant: string;
  size: number;
  newName: string;
  newFullName: string;
};

class PrepareImages {
  private readonly imagesSourcesPath: string;
  private readonly imagesTargetPath: string;
  private readonly tempPath: string;
  private readonly allowSizes: number[];
  private readonly allowFormats: string[];

  constructor({ imagesSourcesPath, imagesTargetPath, imagesTempPath }: PrepareImagesArgs) {
    this.imagesSourcesPath = imagesSourcesPath;
    this.imagesTargetPath = imagesTargetPath;
    this.tempPath = imagesTempPath;

    this.allowSizes = [128, 240, 360, 480, 640, 1280, 1600, 1920, 2560, 3840, 5210, 7680];
    this.allowFormats = ['gif'];
  }

  getImages() {
    return readDirR({
      path: this.imagesSourcesPath,
      formats: this.allowFormats,
    });
  }

  getJsons() {
    return readDirR({
      path: this.imagesSourcesPath,
      formats: ['json'],
    });
  }

  async formatTarget(img: FileInfo): Promise<TargetOrUndefined> {
    const formattedImg = img as FormattedImage;
    const sizes: number[] = [];

    const { fullPath } = formattedImg;

    let meta;

    try {
      meta = await sharp(fullPath).metadata();
    } catch (err) {
      console.error(err);

      return;
    }

    const metaHeight = meta.height as number;
    const metaWidth = meta.width as number;

    const variant = getImageVariant({ width: metaWidth, height: metaHeight });

    formattedImg.size = {
      width: metaWidth,
      height: metaHeight,
    };

    if (metaWidth < 128) {
      sizes.push(metaWidth);

      return {
        img: formattedImg,
        sizes,
        tooSmall: true,
        variant,
      };
    }

    const maxWidth = getMaxWidth(metaWidth) as number;

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

  async formatEachTarget(images: FileInfo[]) {
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
  async convertEachTarget(targets: Target[]) {
    for (const targetCur of targets) {
      await this.convertTargetEachSize(targetCur);
    }
  }

  async convertTargetEachSize({ img, sizes, variant, invalidRatio }: Target) {
    if (!img || !sizes) {
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

  async convert({ img, size, variant, newFullName }: TargetForConvert) {
    const sizeAsNumber = Number(size);

    let options: sharp.ResizeOptions = {
      width: sizeAsNumber,
    };

    if (variant === 'v') {
      options = {
        height: sizeAsNumber,
      };
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

  async copyJsons() {
    const jsons = this.getJsons();

    for (const jsonCur of jsons) {
      const indexStart = paths.imagesSourcesPath.length;
      const newSubFolder = jsonCur.fullPathWithoutName.substring(indexStart);

      const jsonCurTargetDir = `${this.imagesTargetPath}/${newSubFolder}`;
      const jsonCurTarget = `${jsonCurTargetDir}/${jsonCur.name}`;

      await fs.cp(jsonCur.fullPath, jsonCurTarget);

      console.log(`${jsonCur.name} copied to ${jsonCurTargetDir}`);
    }
  }

  async start() {
    removeDir(this.imagesTargetPath);
    makeDir(this.imagesTargetPath);

    const images = this.getImages();

    const targets = await this.formatEachTarget(images);

    await this.convertEachTarget(targets as Target[]);

    removeDir(this.tempPath);

    await this.copyJsons();

    console.log('done');
  }
}

const prepareImages = new PrepareImages({
  imagesSourcesPath: paths.gifsSourcesPath,
  imagesTargetPath: paths.gifsTargetPath,
  imagesTempPath: paths.gifsTempPath,
});

prepareImages.start();
