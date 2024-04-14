const path = require('path');

const mDaysDirRoot = path.resolve(__dirname, '../../../../');

const photosSourcesPath = 'C:\\Users\\K\\Downloads\\pics';
const photosTargetPath = path.join(photosSourcesPath, './_ready');
const photosTempPath = path.join(photosSourcesPath, './_temp');

const imagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics\\_ready_random\\static';
const imagesTargetPath = 'C:\\Users\\K\\Downloads\\pics\\static\\_ready';
const imagesTempPath = 'C:\\Users\\K\\Downloads\\pics\\static\\_temp';

const gifsSourcesPath = 'C:\\Users\\K\\Downloads\\pics\\_ready_random\\dynamic';
const gifsTargetPath = 'C:\\Users\\K\\Downloads\\pics\\dynamic\\_ready';
const gifsTempPath = 'C:\\Users\\K\\Downloads\\pics\\dynamic\\_temp';

const randomImagesSourcesPath = 'C:\\Users\\K\\Downloads\\pics';
const randomImagesTargetPath = path.join(randomImagesSourcesPath, './_ready_random');
const randomImagesTempPath = path.join(randomImagesSourcesPath, './_temp');

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
