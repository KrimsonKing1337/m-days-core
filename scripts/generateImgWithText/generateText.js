const sharp = require('sharp');

async function main() {
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ('0' + date_ob.getDate()).slice(-2);

  // current month
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  let width = 200;
  let height = 100;
  let label = `${hours}:${minutes}`;

  const image = await sharp('./1.jpg');
  const metadata = await image.metadata()

  const bg = Buffer.from(`
    <svg height="${metadata.height}" width="${metadata.width}">
      <rect x="0" y="0" width="100%" height="100%" fill="#000" fill-opacity="0.3" />
    </svg>
  `);

  const svg = Buffer.from(`
    <svg height="${height}" width="${width}">
      <text x="50%" y="50%" text-anchor="middle" dy="0.4em" font-size="${width / 4}" fill="#fff" font-family="sans">
        ${label}
      </text> 
    </svg>
`);

  const compositeImages = [
    {
      input: bg,
      gravity: 'centre'
    },
    {
      input: svg,
      gravity: 'center',
    }
  ];

  await image.composite(compositeImages).toFile('result.jpg');
}

main();
