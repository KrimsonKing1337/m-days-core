/**
 *
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
