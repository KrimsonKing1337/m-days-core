const path = require('path');
const fs = require('fs');

const { getFiles } = require('./getFiles.js');

const publicDir = process.argv[2];

const dir = `${publicDir}/test`;

async function scanImages() {
  const files = getFiles(dir);

  const filesJSON = JSON.stringify(files);

  fs.writeFileSync(path.resolve(publicDir, './img_bg.json'), filesJSON);
}

scanImages();
