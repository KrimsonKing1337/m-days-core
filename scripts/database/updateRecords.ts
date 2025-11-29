import fs from 'fs/promises';
import path from 'path';
import { MongoClient } from 'mongodb';
import { z, ZodError, ZodObject } from 'zod/v4';

import { writeLog } from './logger.js';

const uri = 'mongodb://localhost:27017';

const dbName = 'cache';

const collectionName = 'images';
const tempCollectionName = 'images_temp';
const oldCollectionName = 'images_old';

const ImageSchema = z.object({
  id: z.string().nonempty(),
  type: z.enum(['dynamic', 'static']),
  collection: z.string().nonempty(),
  topic: z.string().nonempty(),
  orientation: z.enum(['h', 'v', 's']),
  width: z.number().positive(),
  filename: z.string().nonempty(),
  path: z.string().nonempty(),
  size: z.number().positive(),
});

type Image = z.infer<typeof ImageSchema>;

type ImageInvalidField = {
  item: Image,
  errors: ZodError,
};

const chunksDir = 'D:/Projects/m-days/01. digital/m-days-core/test';

const client = new MongoClient(uri);

type ValidateArgs = {
  Schema: ZodObject<any>;
  data: any[];
  fileName?: string;
  withLog?: boolean;
};

async function validate({ Schema, data, fileName = '', withLog = false }: ValidateArgs) {
  const invalidFields: ImageInvalidField[] = [];

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

async function updateRecords() {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(tempCollectionName);

    const filesAsync = await fs.readdir(chunksDir);

    const files = filesAsync
      .filter(file => file.endsWith('.json'))
      .sort(); // по алфавиту - чтобы загружались по порядку

    for (const file of files) {
      const fullPath = path.join(chunksDir, file);

      const content = await fs.readFile(fullPath, 'utf8');

      const data: Image[] = JSON.parse(content);

      const isInvalid = await validate({
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

    console.log('Done!');
  } catch (err) {
    console.error('There is an error while importing:', err);

    process.exit(1);
  }

  await client.close();
}

updateRecords();
