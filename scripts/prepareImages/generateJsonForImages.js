const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\K\\Downloads\\pics\\_ready';

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
      const strResult = str.replace(/\\/g, '/'); // todo: this is for windows only

      result[item] = strResult.substring(1);
    }
  }

  return result;
}

const dirTree = readDirectory(dir);

// const result = JSON.stringify(dirTree, null, 2);
const result = JSON.stringify(dirTree);

fs.writeFileSync('./img_bg.json', result);

console.log('done');
