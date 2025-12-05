# m-days-core

## Requirements
```
node => 16.0.0
npm => 6.5.0
```

## Install
```npm i```
```npm husky init```

## Before start
The are files need to be created.

.env file in root with env variable:
`M_DAYS_ENV=local`
or
`M_DAYS_ENV=server`.

Paths files in `src/config`:\
`paths.local.json`\
`paths.server.json`\
with paths to files.

Example:
```
const mediaSourcesPath = 'home/m-days-public-images_originals';
const mediaTargetPath = '/home/m-days-public-images';

const jsonPresetsPath = '/home/m-days-core/src/config/presets.json';

const mediaStandalonePath = '/home/m-days-fe-widget/public/standalone/media';
const mediaStandaloneJsonPath = '/home/m-days-fe-widget/public/standalone/info.json';

export const paths = {
  mediaSourcesPath,
  mediaTargetPath,
  jsonPresetsPath,
  mediaStandalonePath,
  mediaStandaloneJsonPath,
};
```
