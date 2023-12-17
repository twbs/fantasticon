import slug from 'slugify';
import { GetIconIdFn } from '../types/misc';
import { removeExtension } from './path';

export const getIconId: GetIconIdFn = ({ relativeFilePath }) =>
  slug(removeExtension(relativeFilePath).replaceAll(/([./\\])+/g, '-'), {
    replacement: '-',
    remove: /['"`]/g
  });
