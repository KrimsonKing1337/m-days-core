const path = require('path');

const root = path.resolve(__dirname, '../../');

const imagesSourcesPath = path.join(root, '../photos');
const imagesTargetPath = path.join(root, '../photos/_ready');
const imagesTempPath = path.join(root, '../photos/_temp');

/**
 *
 * @returns {
 *  {
 *    imagesTempPath: string,
 *    imagesSourcesPath: string,
 *    imagesTargetPath: string
 *  }
 * }
 */
function getPaths() {
  return {
    imagesSourcesPath,
    imagesTargetPath,
    imagesTempPath,
  };
}

module.exports = getPaths;
