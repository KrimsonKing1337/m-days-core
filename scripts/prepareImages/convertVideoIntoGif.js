const execSync = require('child_process').execSync;

const { readDirR } = require('./utils');

function convertVideoIntoGif() {
  const files = readDirR({
    path: `\"C:\\Users\\K\\Downloads\\video_files\"`,
    allowFormats: ['mp4'],
  });


  files.forEach((fileCur) => {
    const { fullPath, nameWithoutExt, fullPathWithoutName } = fileCur;

    execSync(`ffmpeg.exe -i \"${fullPath}\" \"${fullPathWithoutName}/${nameWithoutExt}.gif\"`);
  });
}

convertVideoIntoGif();
