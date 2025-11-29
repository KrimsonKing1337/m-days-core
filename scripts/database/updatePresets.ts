import fs from 'fs/promises';
import { MongoClient } from 'mongodb';

import { PresetSchema } from './@schemas';
import { zodValidate } from './zodValidate';

const uri = 'mongodb://localhost:27017';

const dbName = 'presets';
const collectionName = 'presets';

const presetJson = 'D:/Projects/m-days/01. digital/m-days-core/src/config/presets.json';

const client = new MongoClient(uri);

async function updatePresets() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const content = await fs.readFile(presetJson, 'utf8');

    const data = JSON.parse(content);

    const isInvalid = await zodValidate({
      Schema: PresetSchema,
      data,
      fileName: presetJson,
      withLog: true,
    });

    if (isInvalid) {
      return;
    }

    await db.collection('presets').drop();
    await collection.insertMany(data);
  } catch (err) {
    console.error('There is an error while importing:', err);

    process.exit(1);
  }

  await client.close();
}

updatePresets();
