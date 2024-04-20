const fs = require('fs').promises;
const path = require('path');

const dir = 'C:\\Users\\K\\Downloads\\0';
const mask = 'mp4_thumb';

async function deleteImagesByMask() {
  const files = await fs.readdir(dir);

  for (const fileCur of files) {
    if (fileCur.includes(mask)) {
      const fullPath = path.join(dir, fileCur);

      await fs.unlink(fullPath);
    }
  }
}

deleteImagesByMask();
