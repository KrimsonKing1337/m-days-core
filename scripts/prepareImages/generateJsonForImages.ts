import fs from 'fs/promises';
import path from 'path';

import { getPaths } from './utils';

const { sep } = path;

const { jsonChunksPath, mediaTargetPath } = getPaths();

async function findFileUpward(startPath: string, targetFileName: string) {
  let currentDir = path.resolve(startPath);

  // если путь к файлу, а не к папке - поднимаемся к родителю
  const stats = await fs.stat(currentDir);

  if (!stats.isDirectory()) {
    currentDir = path.dirname(currentDir);
  }

  // eslint-disable-next-line no-constant-condition
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

type Item = {
  id: string;
  type: string;
  collection: string;
  topic: string;
  tags: string[];
  orientation: string;
  width: number;
  filename: string;
  path: string;
  size: number;
}

async function getItems(dirPath: string) {
  const result: Item[] = [];

  const getItemsRecursively = async (dirPathRecursive: string) => {
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

        console.log(`Processing file ${safetyFullPath}`);

        const rootPath = await findFileUpward(safetyFullPath, 'info.json') as string;
        const pathToMedia = path.posix.join(rootPath, 'media');

        const pathToFileRelativeToMedia = safetyFullPath.replace(pathToMedia, '').substring(1);
        const pathToFileRelativeToMediaSplit = pathToFileRelativeToMedia.split('/'); // без первого слэша

        // например: static/anime/attack-on-titan/h/1920/-_RW8-noyz.jpg
        // например: static/anime/hayao-miyazaki/gake-no-ue-no-ponyo/h/1920/-_RW8-noyz.jpg
        // далее по вложенности определяем: первая папка - тип, далее идёт коллекция, потом топик и так далее

        const orientation = pathToFileRelativeToMediaSplit[0];
        const width = pathToFileRelativeToMediaSplit[1];

        const infoJsonPath = `${rootPath}/info.json`;

        let skipping = false;

        // информацию о файле берём из info.json.
        // если такого файла нет, в нём есть настройка ignore или файл невалиден - пропускаем эту папку

        const info = await fs.readFile(infoJsonPath).catch((err) => {
          console.error('info.json can\'t be opened, skipping...');
          console.error(err);

          skipping = true;
        });

        const infoJson = JSON.parse((info as Buffer).toString());

        if (infoJson.ignore) {
          console.log(`file: ${infoJsonPath} has ignore option, skipping...`);

          skipping = true;
        }

        if (!(infoJson.type && infoJson.collection && infoJson.topic && infoJson.tags)) {
          const err = new Error(`info.json is not valid. File: ${infoJsonPath}`);

          console.error(err);
          console.log('skipping...');

          skipping = true;
        }

        if (skipping) {
          continue;
        }

        const date = new Date().toISOString();
        // YYYY-MM-DD HH:mm:ss
        const timestamp = date.split('.')[0];

        const id = `${item}___${timestamp}`;

        // возвращаем относительный путь от последней папки в sourcePath
        const basepath = path.basename(mediaTargetPath);
        const index = safetyFullPath.indexOf(basepath);
        const substr = safetyFullPath.slice(index);
        const readyStr = substr.slice(basepath.length + 1);

        const newItem = {
          id,
          type: infoJson.type,
          collection: infoJson.collection,
          topic: infoJson.topic,
          tags: infoJson.tags,
          orientation,
          width: Number(width),
          filename: item,
          path: readyStr,
          size,
        };

        result.push(newItem);
      }
    }
  };

  await getItemsRecursively(dirPath);

  return result;
}

async function generateJsonForImages() {
  const items = await getItems(mediaTargetPath);

  const chunks: Item[][] = [];
  let chunk: Item[] = [];

  items.forEach((itemCur) => {
    if (chunk.length <= 100) {
      chunk.push(itemCur);
    } else {
      chunks.push(chunk);

      chunk = [itemCur];
    }
  });

  chunks.push(chunk);

  await fs.rm(jsonChunksPath, { recursive: true, force: true });
  await fs.mkdir(jsonChunksPath, { recursive: true });

  for (const chunkCur of chunks) {
    const index = chunks.indexOf(chunkCur);
    const resultJson = JSON.stringify(chunkCur, null, 2);

    const jsonPath = path.join(jsonChunksPath, `./chunk-${index}.json`);

    await fs.writeFile(jsonPath, resultJson);
  }

  console.log('done');
}

generateJsonForImages();
