import fs from 'fs';
import path from 'path';

import { rename } from 'node:fs/promises';
import { nanoid } from 'nanoid';

export function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const folder = 'C:\\Users\\K\\Downloads\\pics\\anime\\makoto-shinkai\\vkpic-925689';

for (const file of readAllFiles(folder)) {
  const { dir, ext } = path.parse(file);

  const uniq = nanoid();
  const newName = `${uniq}${ext}`;

  await rename(file, path.join(dir, newName));
}
