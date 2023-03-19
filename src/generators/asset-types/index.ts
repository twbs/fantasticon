import { FontGenerator } from '../../types/generator';
import { AssetType, FontAssetType, OtherAssetType } from '../../types/misc';
import css from './css';
import eot from './eot';
import html from './html';
import json from './json';
import less from './less';
import sass from './sass';
import scss from './scss';
import svg from './svg';
import ts from './ts';
import ttf from './ttf';
import woff from './woff';
import woff2 from './woff2';

const generators: { [key in AssetType]: FontGenerator<any> } = {
  [FontAssetType.SVG]: svg,
  [FontAssetType.TTF]: ttf,
  [FontAssetType.WOFF]: woff,
  [FontAssetType.WOFF2]: woff2,
  [FontAssetType.EOT]: eot,
  [OtherAssetType.CSS]: css,
  [OtherAssetType.HTML]: html,
  [OtherAssetType.JSON]: json,
  [OtherAssetType.TS]: ts,
  [OtherAssetType.LESS]: less,
  [OtherAssetType.SASS]: sass,
  [OtherAssetType.SCSS]: scss
};

export default generators;
