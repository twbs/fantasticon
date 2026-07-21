import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.TTF,

  async generate(_options, ttf) {
    const { default: ttf2woff2 } = await import('ttf2woff2');
    const font = ttf2woff2(ttf);
    return Buffer.from(font.buffer);
  }
};

export default generator;
