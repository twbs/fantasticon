import { createReadStream, ReadStream } from 'fs';
import { FontGenerator } from '../../types/generator';

type GglyphStream = ReadStream & { metadata?: any };

const generator: FontGenerator<void> = {
  async generate({
    name: fontName,
    fontHeight,
    descent,
    normalize,
    assets,
    codepoints,
    formatOptions: { svg } = {}
  }) {
    const { SVGIcons2SVGFontStream } = await import('svgicons2svgfont');

    return new Promise(resolve => {
      let font = Buffer.alloc(0);

      const fontStream = new SVGIcons2SVGFontStream({
        fontName,
        fontHeight,
        descent,
        normalize,
        ...svg
      })
        .on('data', data => (font = Buffer.concat([font, Buffer.from(data)])))
        .on('end', () => resolve(font.toString()));

      for (const { id, absolutePath } of Object.values(assets)) {
        const glyph: GglyphStream = createReadStream(absolutePath);
        const unicode = String.fromCharCode(codepoints[id]);

        glyph.metadata = { name: id, unicode: [unicode] };

        fontStream.write(glyph);
      }

      fontStream.end();
    });
  }
};

export default generator;
