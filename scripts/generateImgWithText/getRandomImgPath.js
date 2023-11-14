const { randomInt } = require('./randomInt.js');

/**
 *
 * @param imgs {string}
 * @returns {string}
 */
function getRandomImgPath(imgs) {
  const random = randomInt(0, imgs.length);

  return `img_bg/1920/${imgs[random]}`;
}

module.exports = { getRandomImgPath };
