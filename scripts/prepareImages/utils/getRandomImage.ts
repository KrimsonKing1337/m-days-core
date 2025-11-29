import fs from 'fs';

import { getRandomInteger } from './getRandomInteger.js';

export function getRandomImage(path: string) {
  const oldFile = '';

  function randomFile() {
    const files = fs.readdirSync(path);
    const file = files[getRandomInteger(0, files.length - 1)];

    if (file === oldFile) {
      randomFile();
    } else {
      return file;
    }
  }

  return randomFile();
}
