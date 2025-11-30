import fs from 'fs/promises';
import path from 'path';
import { MongoClient } from 'mongodb';

import type { Image } from './@types';
import { getPaths } from '../prepareImages/utils';

import { zodValidate } from './zodValidate';
import { ImageSchema } from './@schemas';

const uri = 'mongodb://localhost:27017';

const dbName = 'cache';

const collectionName = 'images';
const tempCollectionName = 'images_temp';
const oldCollectionName = 'images_old';

const client = new MongoClient(uri);

const { jsonChunksPath } = getPaths();

async function updateRecords() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(tempCollectionName);

    const filesAsync = await fs.readdir(jsonChunksPath);

    const files = filesAsync
      .filter(file => file.endsWith('.json'))
      .sort(); // по алфавиту - чтобы загружались по порядку

    for (const file of files) {
      const fullPath = path.join(jsonChunksPath, file);

      const content = await fs.readFile(fullPath, 'utf8');

      const data: Image[] = JSON.parse(content);

      const isInvalid = await zodValidate({
        Schema: ImageSchema,
        data,
        fileName: file,
        withLog: true,
      });

      if (isInvalid) {
        continue;
      }

      console.log(`Importing ${file} (${data.length} records)...`);

      if (data.length > 0) {
        await collection.insertMany(data);
      }
    }

    await db.collection(collectionName).rename(oldCollectionName, { dropTarget: true }); // удалить, если уже есть
    await db.collection(tempCollectionName).rename(collectionName);
    await db.collection(oldCollectionName).drop();
    await client.close();

    console.log('Done!');
  } catch (err) {
    console.error('There is an error while importing:', err);

    await client.close();

    process.exit(1);
  }
}

updateRecords();
