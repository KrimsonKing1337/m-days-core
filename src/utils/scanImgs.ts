const fs = require('fs');

const dir = 'public/img_bg/1920';

try {
  const files = fs.readdirSync(dir);
  const filesJSON = JSON.stringify(files);

  fs.writeFileSync('public/img_bg.json', filesJSON);
} catch (err) {
  console.log(err);
}
