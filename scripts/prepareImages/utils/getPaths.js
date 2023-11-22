const path = require('path');

const mDaysDirRoot = path.resolve(__dirname, '../../../../');

const photosSourcesPath = path.join(mDaysDirRoot, '../photos');
const photosTargetPath = path.join(mDaysDirRoot, '../photos/_ready');
const photosTempPath = path.join(mDaysDirRoot, '../photos/_temp');

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
