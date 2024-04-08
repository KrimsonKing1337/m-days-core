const fs = require('fs');

/**
 *
 * @param path {string}
 */
function makeDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

module.exports =  { makeDir };
