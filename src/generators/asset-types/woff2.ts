import { compress } from 'wawoff2';
import { FontGenerator } from '../../types/generator';
import { FontAssetType } from '../../types/misc';

const generator: FontGenerator<Buffer> = {
  dependsOn: FontAssetType.TTF,

  async generate(_options, ttf) {
    const compressed = await compress(ttf);
    return Buffer.from(compressed);
  }
};

export default generator;
