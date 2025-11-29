import { z } from 'zod/v4';

import { ImageSchema, PresetSchema } from './@schemas';

export type Image = z.infer<typeof ImageSchema>;
export type Preset = z.infer<typeof PresetSchema>;
