const { execSync } = require('child_process');

execSync('npm run clean');
execSync('npm run scss');
execSync('npm run copy-files');
execSync('npm run ts');
execSync('tsc-alias');
execSync('npm run up');
execSync('npm run packaging');
