const fs = require('fs/promises');
const path = require('path');

const { sep } = path;

// const publicPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public';
const targetPath = './test';
// const publicImagesPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images';
const sourcePath = 'D:/Projects/m-days/01. digital/m-days-public-images/test';

// const dirReadyPath = path.join(publicImagesPath, './_ready');

/**
 * Поднимается вверх от начального пути и ищет указанный файл
 * @param {string} startPath - путь к файлу или папке, откуда начать поиск
 * @param {string} targetFileName - имя искомого файла (например, ".gitignore")
 * @returns {Promise<string|null>} - полный путь до найденного файла или null
 */
async function findFileUpward(startPath, targetFileName) {
  let currentDir = path.resolve(startPath);

  // Если путь к файлу, а не папке — поднимемся к родителю
  const stats = await fs.stat(currentDir);

  if (!stats.isDirectory()) {
    currentDir = path.dirname(currentDir);
  }

  while (true) {
    const candidate = path.join(currentDir, targetFileName);

    try {
      // найден файл, возвращаем директорию, где он находится
      await fs.access(candidate);

      if (sep === '\\') {
        return currentDir.replace(/\\/g, '/');
      }

      return currentDir;
    } catch {
      const parentDir = path.dirname(currentDir);

      // достигли корня
      if (parentDir === currentDir) {
        break;
      }

      currentDir = parentDir;
    }
  }

  return null; // файл не найден
}


/**
 *
 * @param dirPath string
 */
async function getItems(dirPath) {
  const result = [];

  const getItemsRecursively = async (dirPathRecursive) => {
    const items = await fs.readdir(dirPathRecursive);

    for (const item of items) {
      const fullPath = path.join(dirPathRecursive, item);
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        await getItemsRecursively(fullPath);
      } else {
        let safetyFullPath = fullPath;

        // меняем разделитель windows \\ на /
        if (sep === '\\') {
          safetyFullPath = safetyFullPath.replace(/\\/g, '/');
        }

        const name = path.basename(safetyFullPath);

        if (name === 'info.json') {
          continue;
        }

        const { size } = stats;

        const rootPath = await findFileUpward(safetyFullPath, 'info.json');
        const pathToMedia = path.posix.join(rootPath, 'media');

        const pathToFileRelativeToMedia = safetyFullPath.replace(pathToMedia, '').substring(1);
        const pathToFileRelativeToMediaSplit = pathToFileRelativeToMedia.split('/'); // без первого слэша

        // например: static/anime/attack-on-titan/h/1920/-_RW8-noyz.jpg
        // например: static/anime/hayao-miyazaki/gake-no-ue-no-ponyo/h/1920/-_RW8-noyz.jpg
        // далее по вложенности определяем: первая папка - тип, далее идёт коллекция, потом топик и так далее

        const orientation = pathToFileRelativeToMediaSplit[0];
        const width = pathToFileRelativeToMediaSplit[1];

        // информацию о файле берём из info.json.
        // если такого файла нет - ошибка и выход из приложения
        const info = await fs.readFile(`${rootPath}/info.json`).catch((err) => {
          console.error(err);

          process.exit(1);
        });

        const infoJson = JSON.parse(info.toString());

        if (!(infoJson.type && infoJson.collection && infoJson.topic && infoJson.tags)) {
          const err = new Error(`info.json is not valid. File: ${rootPath}/info.json`);

          console.error(err);

          process.exit(1);
        }

        const date = new Date().toISOString();
        // YYYY-MM-DD HH:mm:ss
        const timestamp = date.split('.')[0];

        const id = `${item}___${timestamp}`;

        const newItem = {
          id,
          type: infoJson.type,
          collection: infoJson.collection,
          topic: infoJson.topic,
          tags: infoJson.tags,
          orientation,
          width: Number(width),
          filename: item,
          path: safetyFullPath,
          size,
        };

        result.push(newItem);
      }
    }
  }

  await getItemsRecursively(dirPath);

  return result;
}

async function generateJsonForImages() {
  const items = await getItems(sourcePath);

  const chunks = [];
  let chunk = [];

  items.forEach((itemCur) => {
    if (chunk.length <= 100) {
      chunk.push(itemCur);
    } else {
      chunks.push(chunk);

      chunk = [itemCur];
    }
  });

  chunks.push(chunk);

  await fs.rm(targetPath, { recursive: true, force: true });
  await fs.mkdir(targetPath, { recursive: true });

  for (const chunkCur of chunks) {
    const index = chunks.indexOf(chunkCur);
    const resultJson = JSON.stringify(chunkCur, null, 2);

    const jsonPath = path.join(targetPath, `./chunk-${index}.json`);

    await fs.writeFile(jsonPath, resultJson);
  }

  console.log('done');
}

generateJsonForImages();
