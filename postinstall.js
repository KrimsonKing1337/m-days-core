const fs = require('fs');

if (fs.existsSync('./tsconfig.json') === false) {
  fs.cpSync('./lib/src', './', {recursive: true});
  fs.rmSync('./lib', {recursive: true});
}
