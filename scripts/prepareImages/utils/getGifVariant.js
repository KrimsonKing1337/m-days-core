/**
 *
 * @param fullPath {string}
 */
function getGifVariant(fullPath) {
  if (fullPath.includes('/v/')) {
    return 'v';
  }

  if (fullPath.includes('/h/')) {
    return 'h';
  }

  return 'sq';
}

module.exports = { getGifVariant };
