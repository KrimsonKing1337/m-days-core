import { z } from 'zod/v4';

export const ImageSchema = z.object({
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

const PresetValuesTypeSchema = z.object({
  collection: z.string().nonempty(),
  topic: z.string().nonempty(),
});

const PresetValuesSchema = z.object({
  dynamic: z.array(PresetValuesTypeSchema),
  static: z.array(PresetValuesTypeSchema),
});

export const PresetSchema = z.object({
  id: z.string().nonempty(),
  values: PresetValuesSchema,
  skin: z.string().nonempty().optional(),
});
