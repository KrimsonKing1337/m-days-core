const path = require('path');

const mDaysDirRoot = path.resolve(__dirname, '../../../../');

const photosSourcesPath = 'D:\\Images\\m-days\\static';
const photosTargetPath = path.join(photosSourcesPath, './_ready');
const photosTempPath = path.join(photosSourcesPath, './_temp');

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

    gifsSourcesPath,
    gifsTargetPath,
    gifsTempPath
  };
}

module.exports = { getPaths };
