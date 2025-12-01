import path from 'path';

const mediaSourcesPath = 'G:\\m-days\\01. digital\\m-days-public-images_originals';
const mediaTargetPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images';

const imagesSourcesPath = path.join(mediaSourcesPath, './_ready_random/static');
const imagesTargetPath = path.join(mediaTargetPath, './static');
const imagesTempPath =  path.join(mediaTargetPath, './static/_temp');

const randomImagesSourcesPath = mediaSourcesPath;
const randomImagesTargetPath = path.join(randomImagesSourcesPath, './_ready_random');
const randomImagesTempPath = path.join(randomImagesSourcesPath, './_temp');

const gifsSourcesPath = path.join(mediaSourcesPath, './_ready_random/dynamic');
const gifsTargetPath = path.join(mediaTargetPath, './dynamic');
const gifsTempPath = path.join(mediaTargetPath, './dynamic/_temp');

const randomGifsSourcesPath = mediaSourcesPath;
const randomGifTargetPath = path.join(randomGifsSourcesPath, './_ready_random');
const randomGifTempPath = path.join(randomGifsSourcesPath, './_temp');

const jsonChunksPath = path.join(mediaTargetPath, './_chunks');
const jsonPresetsPath = 'D:\\Projects\\m-days\\01. digital\\m-days-core\\src\\config\\presets.json';

const mediaStandalonePath = 'D:\\Projects\\m-days\\01. digital\\m-days-fe-widget\\dist\\standalone\\media';
const mediaStandaloneJsonPath = 'D:\\Projects\\m-days\\01. digital\\m-days-fe-widget\\dist\\standalone\\info.json';

export function getPaths() {
  return {
    mediaSourcesPath,
    mediaTargetPath,

    imagesSourcesPath,
    imagesTargetPath,
    imagesTempPath,

    randomImagesSourcesPath,
    randomImagesTargetPath,
    randomImagesTempPath,

    gifsSourcesPath,
    gifsTargetPath,
    gifsTempPath,

    randomGifsSourcesPath,
    randomGifTargetPath,
    randomGifTempPath,

    jsonChunksPath,
    jsonPresetsPath,

    mediaStandalonePath,
    mediaStandaloneJsonPath,
  };
}
