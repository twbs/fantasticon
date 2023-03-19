import svg2ttf from 'svg2ttf';
import { SvgIcons2FontOptions } from 'svgicons2svgfont';
import ttf2woff from 'ttf2woff';
import { Arguments } from './utils';

type WoffOptions = Arguments<typeof ttf2woff>[1];
type TtfOptions = svg2ttf.FontOptions;
type SvgOptions = Omit<
  SvgIcons2FontOptions,
  'fontName' | 'fontHeight' | 'descent' | 'normalize'
>;

interface JsonOptions {
  indent?: number;
}

interface TsOptions {
  types?: Array<'enum' | 'constant' | 'literalId' | 'literalKey'>;
  singleQuotes?: boolean;
  enumName?: string;
  constantName?: string;
  literalIdName?: string;
  literalKeyName?: string;
}

export interface FormatOptions {
  woff?: WoffOptions;
  ttf?: TtfOptions;
  svg?: SvgOptions;
  json?: JsonOptions;
  ts?: TsOptions;
}
