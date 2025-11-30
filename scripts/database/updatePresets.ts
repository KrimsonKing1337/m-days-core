import fs from 'fs/promises';
import { MongoClient } from 'mongodb';

import { getPaths } from '../prepareImages/utils';

import { PresetSchema } from './@schemas';
import { zodValidate } from './zodValidate';

const uri = 'mongodb://localhost:27017';

const dbName = 'presets';
const collectionName = 'presets';

const client = new MongoClient(uri);

const { jsonPresetsPath } = getPaths();

async function updatePresets() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const content = await fs.readFile(jsonPresetsPath, 'utf8');

    const data = JSON.parse(content);

    const isInvalid = await zodValidate({
      Schema: PresetSchema,
      data,
      fileName: jsonPresetsPath,
      withLog: true,
    });

    if (isInvalid) {
      await client.close();

      process.exit(1);
    }

    console.log('Importing presets.json...');

    await db.collection('presets').drop();
    await collection.insertMany(data);
    await client.close();

    console.log('Done!');
  } catch (err) {
    console.error('There is an error while importing:', err);

    await client.close();

    process.exit(1);
  }
}

updatePresets();
