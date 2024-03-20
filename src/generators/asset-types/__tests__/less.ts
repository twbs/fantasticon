import lessGen from '../less';
import { renderSrcAttribute } from '../../../utils/css';
import { resolve } from 'path';

const renderSrcMock = renderSrcAttribute as any as jest.Mock;

const mockOptions = {
  name: 'test',
  prefix: 'tf',
  tag: 'b',
  codepoints: { 'my-icon': 0xf101 },
  assets: { 'my-icon': null },
  templates: {
    less: resolve(__dirname, '../../../../templates/less.hbs')
  }
} as any;

jest.mock('../../../utils/css', () => ({
  renderSrcAttribute: jest.fn(() => '"::src-attr::"')
}));

describe('`LESS` asset generator', () => {
  beforeEach(() => {
    renderSrcMock.mockClear();
  });

  test('renders LESS correctly with prefix and tag name options', async () => {
    expect(
      await lessGen.generate(mockOptions, Buffer.from(''))
    ).toMatchSnapshot();
  });

  test('renders LESS correctly with `selector` option', async () => {
    expect(
      await lessGen.generate(
        { ...mockOptions, selector: '.my-selector' },
        Buffer.from('')
      )
    ).toMatchSnapshot();
  });

  test('calls renderSrcAttribute correctly and includes its return value in the rendered template', async () => {
    const fontBuffer = Buffer.from('::svg-content::');

    const result = await lessGen.generate(mockOptions, fontBuffer);

    expect(renderSrcMock).toHaveBeenCalledTimes(1);
    expect(renderSrcMock).toHaveBeenCalledWith(mockOptions, fontBuffer);
    expect(result).toContain('::src-attr::');
  });

  test('renders expected selector blocks', async () => {
    const less = await lessGen.generate(mockOptions, Buffer.from(''));

    expect(less).toContain(
      'b[class^="tf-"]::before, b[class*=" tf-"]::before {'
    );
    expect(less).toContain('.tf-my-icon::before {');
  });

  test('renders expected variables', async () => {
    const less = await lessGen.generate(mockOptions, Buffer.from(''));

    expect(less).toContain('@test-font:');
    expect(less).toContain('@test-map:');
  });

  test('renders expected selector blocks with `selector` option', async () => {
    const less = await lessGen.generate(
      { ...mockOptions, selector: '.my-selector' },
      Buffer.from('')
    );

    expect(less).toContain('.my-selector::before {');
    expect(less).toContain('.my-selector.tf-my-icon::before {');
  });
});
