import { execSync } from 'child_process';

import { readDirR } from './utils';

function convertVideoIntoGif() {
  const files = readDirR({
    path: `\C:\\Users\\K\\Downloads\\Telegram Desktop\\ChatExport_2024-04-10\\video_files`,
    allowFormats: ['mp4'],
  });


  files.forEach((fileCur) => {
    const { fullPath, nameWithoutExt, fullPathWithoutName } = fileCur;

    execSync(`ffmpeg.exe -i \"${fullPath}\" \"${fullPathWithoutName}/${nameWithoutExt}.gif\"`);
  });
}

convertVideoIntoGif();
