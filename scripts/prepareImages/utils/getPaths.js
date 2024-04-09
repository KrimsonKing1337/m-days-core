const path = require('path');

const mDaysDirRoot = path.resolve(__dirname, '../../../../');

const photosSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test';
const photosTargetPath = path.join(photosSourcesPath, './_ready');
const photosTempPath = path.join(photosSourcesPath, './_temp');

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics-test';
const imagesTargetPath = path.join(imagesSourcesPath, './_ready');
const imagesTempPath = path.join(imagesSourcesPath, './_temp');

const gifsSourcesPath = path.join(mDaysDirRoot, '../images');
const gifsTargetPath = path.join(mDaysDirRoot, '../images/_ready/pixel'); // todo
const gifsTempPath = path.join(mDaysDirRoot, '../images/_temp');

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
    gifsTempPath
  };
}

module.exports = { getPaths };
