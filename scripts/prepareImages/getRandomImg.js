const fs = require('fs');

const { random } = require('./getRandomInteger.js');

/**
 *
 * @param path
 * @returns {string}
 */
function getRandomImg(path) {
    let oldFile;

    function randomFile() {
        const files = fs.readdirSync(path);
        const file = files[random(0, files.length - 1)];

        if (file === oldFile) {
            randomFile();
        } else {
           return file;
        }
    }

    return randomFile();
}

module.exports = { getRandomImg };
