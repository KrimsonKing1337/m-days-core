import path from 'path';
import fs from 'fs';

import { getFiles } from './getFiles.js';

const publicDir = process.argv[2];

const dir = `${publicDir}/test`;

async function scanImages() {
  const files = getFiles(dir);

  const filesJSON = JSON.stringify(files);

  fs.writeFileSync(path.resolve(publicDir, './img_bg.json'), filesJSON);
}

scanImages();
