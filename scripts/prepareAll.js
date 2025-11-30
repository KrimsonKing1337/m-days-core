import { execSync } from 'child_process';

execSync('npm run copy-random', { stdio: 'inherit' });
execSync('npm run prepare-images', { stdio: 'inherit' });
execSync('npm run prepare-gifs', { stdio: 'inherit' });
execSync('npm run generate-json', { stdio: 'inherit' });
execSync('npm run update-db', { stdio: 'inherit' });
execSync('npm run clean', { stdio: 'inherit' });
