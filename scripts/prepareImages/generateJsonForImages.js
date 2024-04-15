const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\K\\Downloads\\pics\\static\\_ready';

function readDirectory() {
  const result = {};

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result[item] = readDirectory(fullPath);
    } else {
      result[item] = fullPath;
    }
  }

  return result;
}

const dirTree = readDirectory();

const result = JSON.stringify(dirTree, null, 2);

fs.writeFileSync('./result.json', result);
