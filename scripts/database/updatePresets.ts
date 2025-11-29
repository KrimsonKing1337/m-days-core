import fs from 'fs/promises';
import { MongoClient } from 'mongodb';
import { z, ZodError, ZodObject } from 'zod/v4';

import { writeLog } from './logger.js';

const uri = 'mongodb://localhost:27017';

const dbName = 'presets';
const collectionName = 'presets';

const PresetValuesSchema = z.object({
  dynamic: z.array(z.string()),
  static: z.array(z.string()),
});

const PresetSchema = z.object({
  id: z.string().nonempty(),
  values: PresetValuesSchema,
});

type Preset = z.infer<typeof PresetSchema>;

type PresetInvalidField = {
  item: Preset,
  errors: ZodError,
};

const presetJson = 'D:/Projects/m-days/01. digital/m-days-core/src/config/presets.json';

const client = new MongoClient(uri);

type ValidateArgs = {
  Schema: ZodObject<any>;
  data: any[];
  fileName?: string;
  withLog?: boolean;
};

async function validate({ Schema, data, fileName = '', withLog = false }: ValidateArgs) {
  const invalidFields: PresetInvalidField[] = [];

  for (const dataField of data) {
    const result = Schema.safeParse(dataField);

    if (!result.success) {
      invalidFields.push({
        item: dataField,
        errors: result.error,
      });
    }
  }

  const isInvalid = invalidFields.length > 0;

  if (isInvalid && withLog) {
    for (const fieldCur of invalidFields) {
      console.log(`There is an error in a field: ${fieldCur.item.id}, skipping...`);

      const prettyError = z.prettifyError(fieldCur.errors);

      await writeLog({
        type: 'error',
        message: `file: ${fileName},\nfield id: ${fieldCur.item.id},\nerrors:\n${prettyError}`,
      });
    }
  }

  return isInvalid;
}

async function updatePresets() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const content = await fs.readFile(presetJson, 'utf8');

    const data = JSON.parse(content);

    const isInvalid = await validate({
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
