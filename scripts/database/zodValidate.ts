import { z, ZodError, ZodObject } from 'zod/v4';

import { Image, Preset } from './@types';

import { writeLog } from './logger';

type ValidateArgs = {
  Schema: ZodObject<any>;
  data: any[];
  fileName?: string;
  withLog?: boolean;
};

type ImageInvalidField = {
  item: Image,
  errors: ZodError,
};

type PresetInvalidField = {
  item: Preset,
  errors: ZodError,
};

type InvalidField = ImageInvalidField | PresetInvalidField;

export async function zodValidate({ Schema, data, fileName = '', withLog = false }: ValidateArgs) {
  const invalidFields: InvalidField[] = [];

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
