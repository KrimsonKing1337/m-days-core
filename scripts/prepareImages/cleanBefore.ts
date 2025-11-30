import fs from 'fs/promises';

import { getPaths } from './utils';

const paths = getPaths();

export async function cleanBefore() {
  const { mediaTargetPath } = paths;

  await fs.rm(mediaTargetPath, { recursive: true, force: true });
  await fs.mkdir(mediaTargetPath);

  console.log('clean before is done');
}

cleanBefore();
