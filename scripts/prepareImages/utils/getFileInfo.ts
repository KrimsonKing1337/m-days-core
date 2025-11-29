import path from 'path';

export type FileInfo = {
  name: string;
  ext: string;
  nameWithoutExt: string;
  fullPath: string;
  fullPathWithoutName: string;
  subFolder: string;
};

export function getFileInfo(pathFile: string): FileInfo {
  const name = path.basename(pathFile);
  const ext = path.extname(pathFile).toLowerCase();
  const dir = path.dirname(pathFile);
  const subFolder = path.basename(dir);

  return {
    name,
    ext: ext.replace('.', ''),
    nameWithoutExt: name.replace(ext, ''),
    fullPath: pathFile,
    fullPathWithoutName: dir,
    subFolder: subFolder,
  };
}
