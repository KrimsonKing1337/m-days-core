"use strict";
var fs = require('fs');
var dir = 'public/img_bg/1920';
try {
    var files = fs.readdirSync(dir);
    var filesJSON = JSON.stringify(files);
    fs.writeFileSync('public/img_bg.json', filesJSON);
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=scanImgs.js.map