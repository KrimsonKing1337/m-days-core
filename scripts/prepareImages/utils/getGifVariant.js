/**
 *
 * @param width {number}
 * @param height {number}
 */
function getGifVariant({ width, height } = {}) {
  if (width > height) {
    return 'h';
  }

  if (width < height) {
    return 'v';
  }

  return 'sq';
}

module.exports = { getGifVariant };
