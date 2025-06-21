/**
 *
 * @param width {number}
 * @param height {number}
 */
function getImageVariant({ width, height } = {}) {
  if (width > height) {
    if (width / height > 1 && width / height < 1.3333) {
      return 's';
    }

    return 'h';
  }

  if (width < height) {
    if (width / height > 0.7 && width / height < 1) {
      return 's';
    }

    return 'v';
  }

  return 's';
}

module.exports = { getImageVariant };
