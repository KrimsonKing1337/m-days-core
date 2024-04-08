const path = require('path');

/**
 *
 * @param pathFile {string}
 */
function getFileInfo(pathFile) {
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

module.exports = { getFileInfo };
