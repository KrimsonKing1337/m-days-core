import path from 'path';

const mediaSourcesPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images_originals_test';
const mediaTargetPath = 'D:\\Projects\\m-days\\01. digital\\m-days-public-images_test';

const imagesSourcesPath = path.join(mediaSourcesPath, './_ready_random/static');
const imagesTargetPath = path.join(mediaTargetPath, './_ready/static');
const imagesTempPath =  path.join(mediaTargetPath, './_ready/static/_temp');

const gifsSourcesPath = path.join(mediaSourcesPath, './_ready_random/dynamic');
const gifsTargetPath = path.join(mediaTargetPath, './_ready/dynamic');
const gifsTempPath = path.join(mediaTargetPath, './_ready/dynamic/_temp');

const randomImagesSourcesPath = mediaSourcesPath;
const randomImagesTargetPath = path.join(randomImagesSourcesPath, './_ready_random');
const randomImagesTempPath = path.join(randomImagesSourcesPath, './_temp');

const jsonChunksPath = path.join(mediaTargetPath, './_chunks');

export function getPaths() {
  return {
    mediaSourcesPath,
    mediaTargetPath,

    imagesSourcesPath,
    imagesTargetPath,
    imagesTempPath,

    gifsSourcesPath,
    gifsTargetPath,
    gifsTempPath,

    randomImagesSourcesPath,
    randomImagesTargetPath,
    randomImagesTempPath,

    jsonChunksPath,
  };
}
