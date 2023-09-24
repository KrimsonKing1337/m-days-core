/**
 *
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function getRandomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
};

module.exports = { getRandomInteger };
