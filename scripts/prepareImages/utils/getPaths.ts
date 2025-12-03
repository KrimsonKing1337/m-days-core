import path from 'path';
import { paths } from 'config/paths.local';

const {
  mediaSourcesPath,
  mediaTargetPath,
  jsonPresetsPath,
  mediaStandalonePath,
  mediaStandaloneJsonPath,
} = paths;

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
