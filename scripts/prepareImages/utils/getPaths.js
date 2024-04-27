const path = require('path');

const sourceImagesPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images_originals';
const destinationImagesPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images';

const imagesSourcesPath = path.join(sourceImagesPath, './_ready_random/static');
const imagesTargetPath = path.join(destinationImagesPath, './_ready/static');
const imagesTempPath =  path.join(destinationImagesPath, './_ready/static/_temp');

const gifsSourcesPath = path.join(sourceImagesPath, './_ready_random/dynamic');
const gifsTargetPath = path.join(destinationImagesPath, './_ready/dynamic');
const gifsTempPath = path.join(destinationImagesPath, './_ready/dynamic/_temp');

const randomImagesSourcesPath = sourceImagesPath;
const randomImagesTargetPath = path.join(randomImagesSourcesPath, './_ready_random');
const randomImagesTempPath = path.join(randomImagesSourcesPath, './_temp');

/**
 *
 * @returns {
 *  {
 *    imagesSourcesPath: string,
 *    imagesTargetPath: string,
 *    imagesTempPath: string,
 *
 *    gifsSourcesPath: string,
 *    gifsTargetPath: string,
 *    gifsTempPath: string,
 *
 *    randomImagesSourcesPath: string,
 *    randomImagesTargetPath: string,
 *    randomImagesTempPath: string,
 *  }
 * }
 */
function getPaths() {
  return {
    imagesSourcesPath,
    imagesTargetPath,
    imagesTempPath,

    gifsSourcesPath,
    gifsTargetPath,
    gifsTempPath,

    randomImagesSourcesPath,
    randomImagesTargetPath,
    randomImagesTempPath,
  };
}

module.exports = { getPaths };
