import { Buffer } from 'buffer';
import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';
import { renderSrcAttribute } from '../../utils/css';
import { renderTemplate } from '../../utils/template';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.SVG,

  generate: async (options, svg: Buffer) =>
    renderTemplate(options.templates.sass, {
      ...options,
      fontSrc: renderSrcAttribute(options, svg)
    })
};

export default generator;
