const path = require('path');

const mDaysDirRoot = path.resolve(__dirname, '../../../../');

const photosSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test';
const photosTargetPath = path.join(photosSourcesPath, './_ready');
const photosTempPath = path.join(photosSourcesPath, './_temp');

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test';
const imagesTargetPath = path.join(imagesSourcesPath, './_ready');
const imagesTempPath = path.join(imagesSourcesPath, './_temp');

const gifsSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test\\dynamic';
const gifsTargetPath = path.join(gifsSourcesPath, './_ready');
const gifsTempPath = path.join(gifsSourcesPath, './_temp');

const randomImagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test';
const randomImagesTargetPath = path.join(gifsSourcesPath, './_ready');
const randomImagesTempPath = path.join(gifsSourcesPath, './_temp');

/**
 *
 * @returns {
 *  {
 *    photosTempPath: string,
 *    photosSourcesPath: string,
 *    photosTargetPath: string,
 *
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
    photosSourcesPath,
    photosTargetPath,
    photosTempPath,

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
