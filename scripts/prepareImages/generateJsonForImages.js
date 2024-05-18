const fs = require('fs');
const path = require('path');

const { sep } = path;

const publicPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public';
const publicImagesPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images';

const dirReadyPath = path.join(publicImagesPath, './_ready');

function readDirectory(dir) {
  const result = {};

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result[item] = readDirectory(fullPath);
    } else {
      const pivot = '_ready';
      const relativePathIndex = fullPath.indexOf(pivot) + pivot.length;
      const str = fullPath.substring(relativePathIndex);

      let strResult = str;

      if (sep === '\\') {
        // windows
        strResult = str.replace(/\\/g, '/');
      }

      const { size } = fs.statSync(fullPath);

      result[item] = {
        path: strResult.substring(1),
        size,
      };
    }
  }

  return result;
}

const dirTree = readDirectory(dirReadyPath);
const result = JSON.stringify(dirTree, null, 2);

const jsonPath = path.join(publicPath, './img_bg.json');

fs.writeFileSync(jsonPath, result);

console.log('done');
