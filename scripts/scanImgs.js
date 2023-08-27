const fs = require('fs');

const publicDir = process.argv[2];

const dir = `${publicDir}/img_bg/1920`;

try {
  const files = fs.readdirSync(dir);
  const filesJSON = JSON.stringify(files);

  fs.writeFileSync(`${publicDir}/img_bg.json`, filesJSON);
} catch (err) {
  console.log(err);
}
