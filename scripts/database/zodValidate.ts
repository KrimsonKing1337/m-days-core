import { z, ZodError, ZodObject } from 'zod/v4/index';

import { writeLog } from './logger';

type ValidateArgs = {
  Schema: ZodObject<any>;
  data: any[];
  fileName?: string;
  withLog?: boolean;
};

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
