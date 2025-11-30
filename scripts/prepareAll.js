import { execSync } from 'child_process';

execSync('npm run copy-random');
execSync('npm run prepare-images');
execSync('npm run prepare-gifs');
execSync('npm run generate-json');
execSync('npm run update-db');
execSync('npm run clean');
