const fs = require('fs');
const path = require('path');

const { rename } = require('fs/promises');

const { getRandomString } = require('./utils/getRandomString.js');

function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const folder = 'C:\\Users\\K\\Downloads\\Telegram Desktop';

async function renameFiles() {
  for (const file of readAllFiles(folder)) {
    const { dir, ext } = path.parse(file);

    const uniq = getRandomString();
    const newName = `${uniq}${ext}`;

    await rename(file, path.join(dir, newName));
  }
}

renameFiles();
