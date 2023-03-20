import { readFile } from 'fs/promises';
import { isAbsolute, resolve } from 'path';
import process from 'process';
import Handlebars from 'handlebars';
import { getHexCodepoint } from './codepoints';

export const TEMPLATE_HELPERS: Record<string, Function> = {
  codepoint: getHexCodepoint
};

export type CompileOptions = {
  helpers?: Record<string, (...args: any[]) => string>;
};

export const renderTemplate = async (
  templatePath: string,
  context: object,
  options: CompileOptions = {}
) => {
  const absoluteTemplatePath = isAbsolute(templatePath)
    ? templatePath
    : resolve(process.cwd(), templatePath);
  const template = await readFile(absoluteTemplatePath, 'utf8');

  return Handlebars.compile(template)(context, {
    ...options,
    helpers: { ...TEMPLATE_HELPERS, ...options.helpers }
  });
};
