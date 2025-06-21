const fs = require('fs');

const { getFileInfo } = require('./getFileInfo.js');

// R = Recursively

/**
 *
 * @param path {string}
 * @param formats {string[]}
 */
function readDirR({ path, formats = [] }) {
  const result = [];

  const recursive = (path) => {
    const files = fs.readdirSync(path);

    files.forEach((fileCur) => {
      const fileCurFullPath = `${path}/${fileCur}`;
      const stats = fs.statSync(fileCurFullPath);

      if (stats.isFile()) {
        const fileInfo = getFileInfo(fileCurFullPath);

        if (formats.length === 0) {
          result.push(fileInfo);

          return;
        }

        const formatIsOk = formats.some((formatCur) => {
          return formatCur.toLowerCase() === fileInfo.ext.toLowerCase();
        });

        if (formatIsOk === true) {
          result.push(fileInfo);
        } else {
          console.log(`${fileCurFullPath} has wrong format, skip;`);
        }
      } else if (stats.isDirectory()) {
        recursive(fileCurFullPath);
      }
    });
  };

  recursive(path);

  return result;
}

module.exports = { readDirR };
