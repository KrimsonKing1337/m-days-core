import fs from 'fs';
import path from 'path';
import _get from 'lodash/get.js';
import _set from 'lodash/set.js';

// R = Recursively

/**
 *
 * @param root {string}
 */
export function getFiles(root: string) {
  const allFiles = {};

  const rootFolder = root;

  function R(dir: string) {
    const files = fs.readdirSync(dir);

    files.forEach((fileCur) => {
      const fileCurFullPath = `${dir}/${fileCur}`;
      const stats = fs.statSync(fileCurFullPath);

      const cutPath = fileCurFullPath.replace(`${rootFolder}/`, '');
      const dirname = path.dirname(cutPath);
      const key = dirname.replaceAll('/', '.');

      // const key = path.dirname(cutPath).split('/').join('.');

      const basename = path.basename(fileCurFullPath);

      if (stats.isFile()) {
        let value = _get(allFiles, key);

        if (!value) {
          value = [];
        }

        value.push(basename);

        // console.log(`${key} : ${value}`);

        _set(allFiles, key, value);
      } else if (stats.isDirectory()) {
        R(fileCurFullPath);
      }
    });
  }

  R(root);

  return allFiles;
}
