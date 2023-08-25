const fs = require('fs');

if (fs.existsSync('./tgz') === false) {
  fs.mkdirSync('./tgz');
}
