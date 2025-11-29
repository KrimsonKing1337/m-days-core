import fs from 'fs';

if (fs.existsSync('./tgz') === false) {
  fs.mkdirSync('./tgz');
}
