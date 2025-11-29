import path from 'path';
import sharp from 'sharp';

import { getRandomImgPath } from './getRandomImgPath.js';
import imgs from './img_bg.json';

const publicImagesPath = path.resolve(__dirname, '../../../m-days-public/');

async function main() {
  const date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  const day = ('0' + date_ob.getDate()).slice(-2);

  // current month
  const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  const year = date_ob.getFullYear();

  // current hours
  const hours = date_ob.getHours();

  // current minutes
  const minutes = date_ob.getMinutes();

  // current seconds
  // let seconds = date_ob.getSeconds();

  // const width = 200;
  // const height = 100;

  const timeLabel = `${hours}:${minutes}`;
  const dateLabel = `${day}.${month}.${year}`;

  console.log('___', dateLabel);

  const randomImagePath = getRandomImgPath(imgs as string[]);
  const imagePath = path.join(publicImagesPath, randomImagePath);

  const image = await sharp(imagePath);
  const metadata = await image.metadata();

  const metaHeight = metadata.height as number;
  const metaWidth = metadata.width as number;

  const shadow = Buffer.from(`
    <svg height="${metaHeight}" width="${metaWidth}">
      <rect x="0" y="0" width="100%" height="100%" fill="#000" fill-opacity="0.3" />
    </svg>
  `);

  const timeHeight = metaHeight / 2;

  /* eslint-disable */
  const time = Buffer.from(`
    <svg height="${timeHeight}" width="${metaWidth}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${timeHeight / 2.5}" fill="#fff" font-family="sans">
        ${timeLabel}
      </text> 
    </svg>
  `);
  /* eslint-enable */

  const dateHeight = metaHeight / 1.6;

  /* eslint-disable */
  const date = Buffer.from(`
    <svg height="${dateHeight}" width="${metaWidth}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${dateHeight / 6}" font-stretch="ultra-condensed" fill="#fff" font-family="sans">
        ${dateLabel}
      </text> 
    </svg>
  `);
  /* eslint-enable */

  const compositeImages = [
    {
      input: shadow,
      gravity: 'center',
    },
    {
      input: time,
      gravity: 'center',
    },
    {
      input: date,
      gravity: 'south',
    },
  ];

  await image.composite(compositeImages).toFile('result.jpg');
}

main();
