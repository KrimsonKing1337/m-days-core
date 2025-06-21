const path = require('path');
const fs = require('fs');

const targetPath = 'D:\\Images\\classical-art';
const sourcePath = 'D:\\Images\\classical-art_ready';

const amount = 10;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function copyFilesFromSubDirs() {
  const subDirs = fs.readdirSync(targetPath);

  const result = [];

  subDirs.forEach((subDirCur) => {
    const subDirPath = path.join(targetPath, subDirCur);
    const subDirFiles = fs.readdirSync(subDirPath);

    const arr = [];

    for (let i = 0; i < amount; i++) {
      const randomInt = randomIntFromInterval(0, subDirFiles.length - 1);
      const randomFileName = subDirFiles[randomInt];

      if (!randomFileName) {
        continue;
      }

      const randomFilePath = path.join(subDirPath, randomFileName);

      arr.push(randomFilePath);
    }

    result.push(...arr);
  });

  result.forEach((filePathCur) => {
    const base = path.parse(filePathCur).base;

    fs.cpSync(filePathCur, path.join(sourcePath, base));
  });
}

copyFilesFromSubDirs();
