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

const PresetOptionsTypeSizeSchema = z.array(
  z.union([
    z.number().positive(),
    z.enum(['windowWidth', 'all']),
  ]),
).length(2).optional();

const PresetOptionsTypeSchema = z.object({
  width: PresetOptionsTypeSizeSchema,
  height: PresetOptionsTypeSizeSchema,
});

const PresetOptionsSchema = z.object({
  dynamic: PresetOptionsTypeSchema.optional(),
  static: PresetOptionsTypeSchema.optional(),
  skin: z.string().nonempty().optional(),
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
  options: PresetOptionsSchema.optional(),
});
