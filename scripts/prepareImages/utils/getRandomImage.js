import fs from 'fs';

const { random } = require('./getRandomInteger.js');

/**
 *
 * @param path
 * @returns {string}
 */
export function getRandomImage(path) {
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
