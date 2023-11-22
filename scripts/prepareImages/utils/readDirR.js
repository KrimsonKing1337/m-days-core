const fs = require('fs');

const { getFileInfo } = require('./getFileInfo.js');

// R = Recursively

/**
 *
 * @param path {string}
 * @param formats {string[]}
 */
function readDirR({ path, formats = [] }) {
  const allFiles = [];

  function R(path) {
    const files = fs.readdirSync(path);

    files.forEach((fileCur) => {
      const fileCurFullPath = `${path}/${fileCur}`;
      const stats = fs.statSync(fileCurFullPath);

      if (stats.isFile()) {
        const fileInfo = getFileInfo(fileCurFullPath);

        if (formats.length === 0) {
          allFiles.push(fileInfo);

          return;
        }

        const formatIsOk = formats.some((formatCur) => {
          return formatCur.toLowerCase() === fileInfo.ext.toLowerCase();
        });

        if (formatIsOk === true) {
          allFiles.push(fileInfo);
        } else {
          console.log(`${fileCurFullPath} has wrong format, skip;`);
        }
      } else if (stats.isDirectory()) {
        R(fileCurFullPath);
      }
    });
  }

  R(path);

  return allFiles;
}

module.exports = { readDirR };
