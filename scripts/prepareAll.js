import { execSync } from 'child_process';

execSync('npm run clean-before', { stdio: 'inherit' });
execSync('npm run copy-random', { stdio: 'inherit' });
execSync('npm run prepare-images', { stdio: 'inherit' });
execSync('npm run prepare-gifs', { stdio: 'inherit' });
execSync('npm run generate-json', { stdio: 'inherit' });

console.log('all done!');
