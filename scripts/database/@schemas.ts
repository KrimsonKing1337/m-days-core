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

const PresetOptionsGuiSchema = z.object({
  mode: z.enum(['allVisible', 'allInvisible', 'single']),
  noGui: z.boolean().optional(),
  noMDays: z.boolean().optional(),
  weather: z.boolean().optional(),
  year: z.boolean().optional(),
  date: z.boolean().optional(),
  time: z.boolean().optional(),
  hours: z.boolean().optional(),
  minutes: z.boolean().optional(),
  seconds: z.boolean().optional(),
  timeDots: z.boolean().optional(),
  progressBar: z.boolean().optional(),
  days: z.boolean().optional(),
  daysLabel: z.boolean().optional(),
  percent: z.boolean().optional(),
  percentFull: z.boolean().optional(),
  watermark: z.boolean().optional(),
});

const PresetOptionsSchema = z.object({
  dynamic: PresetOptionsTypeSchema.optional(),
  static: PresetOptionsTypeSchema.optional(),
  skin: z.string().nonempty().optional(),
  gui: PresetOptionsGuiSchema.optional(),
  percentUpdateSpeed: z.number().positive().optional(),
  metaRefresh: z.number().positive().optional(),
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
