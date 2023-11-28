const fs = require('fs');
const path = require('path');

const _get = require('lodash/get.js');
const _set = require('lodash/set.js');

// R = Recursively

/**
 *
 * @param root {string}
 */
function getFiles(root) {
  const allFiles = {};

  const rootFolder = root;

  function R(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((fileCur) => {
      const fileCurFullPath = `${dir}/${fileCur}`;
      const stats = fs.statSync(fileCurFullPath);

      const cutPath = fileCurFullPath.replace(`${rootFolder}/`, '');
      const key = path.dirname(cutPath).replaceAll('/', '.');

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

module.exports = { getFiles };
