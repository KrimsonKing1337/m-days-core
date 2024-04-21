const { getPaths } = require('./getPaths.js');

const { readDirR } = require('./readDirR.js');
const { makeDir } = require('./makeDir.js');
const { removeDir } = require('./removeDir.js');

const { getRandomString } = require('./getRandomString.js');
const { getRandomInteger } = require('./getRandomInteger.js');
const { getRandomImage } = require('./getRandomImage.js');

const { getFileInfo } = require('./getFileInfo.js');
const { getMaxWidth } = require('./getMaxWidth.js');

const { getImageVariant } = require('./getImageVariant.js');

module.exports = {
  getPaths,
  readDirR,
  makeDir,
  removeDir,
  getRandomString,
  getRandomInteger,
  getRandomImage,
  getFileInfo,
  getMaxWidth,
  getImageVariant,
};
