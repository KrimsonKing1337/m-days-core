import fs from 'fs/promises';

import { getPaths } from './utils';

const paths = getPaths();

export async function clean() {
  const { randomImagesTargetPath, randomImagesTempPath, jsonChunksPath } = paths;

  await fs.rm(randomImagesTargetPath, { recursive: true, force: true });
  await fs.rm(randomImagesTempPath, { recursive: true, force: true });
  await fs.rm(jsonChunksPath, { recursive: true, force: true });

  console.log('cleaned');
}

clean();
