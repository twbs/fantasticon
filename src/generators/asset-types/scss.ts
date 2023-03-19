import { Buffer } from 'buffer';
import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';
import { renderSrcAttribute } from '../../utils/css';
import { renderTemplate } from '../../utils/template';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.SVG,

  generate: async (options, svg: Buffer) =>
    renderTemplate(
      options.templates.scss,
      { ...options, fontSrc: renderSrcAttribute(options, svg) },
      { helpers: { codepoint: str => str.toString(16) } }
    )
};

export default generator;
