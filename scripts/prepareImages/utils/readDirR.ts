import fs from 'fs';

import { getFileInfo, type FileInfo } from './getFileInfo.js';

// R = Recursively

export type ReadDirR = {
  path: string;
  formats?: string[];
};

export function readDirR({ path, formats = [] }: ReadDirR) {
  const result: FileInfo[] = [];

  const recursive = (path: string) => {
    const files = fs.readdirSync(path);

    files.forEach((fileCur) => {
      const fileCurFullPath = `${path}/${fileCur}`;
      const stats = fs.statSync(fileCurFullPath);

      if (stats.isFile()) {
        const fileInfo = getFileInfo(fileCurFullPath);

        if (formats.length === 0) {
          result.push(fileInfo);

          return;
        }

        const formatIsOk = formats.some((formatCur: string) => {
          return formatCur.toLowerCase() === fileInfo.ext.toLowerCase();
        });

        if (formatIsOk === true) {
          result.push(fileInfo);
        } else {
          console.log(`${fileCurFullPath} has wrong format, skip;`);
        }
      } else if (stats.isDirectory()) {
        recursive(fileCurFullPath);
      }
    });
  };

  recursive(path);

  return result;
}
