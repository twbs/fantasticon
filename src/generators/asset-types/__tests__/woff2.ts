import * as wawoff2 from 'wawoff2';
import { FontGeneratorOptions } from '../../../types/generator';
import woff2Gen from '../woff2';

jest.mock('wawoff2', () => ({
  compress: jest.fn(content => Promise.resolve(`::woff2(${content})::`))
}));

const mockOptions = (woffOptions = { __mock: 'options__' } as any) =>
  ({}) as unknown as FontGeneratorOptions;

const ttf = '::ttf::' as unknown as Buffer;

describe('`WOFF2` font generator', () => {
  beforeEach(() => {
    (wawoff2.compress as jest.Mock).mockClear();
  });

  test('resolves with the correctly processed return value of `wawoff2.compress`', async () => {
    const result = await woff2Gen.generate(mockOptions(), ttf);
    expect(wawoff2.compress).toHaveBeenCalledTimes(1);
    expect(wawoff2.compress).toHaveBeenCalledWith(ttf);
    expect(result).toEqual(Buffer.from(`::woff2(${ttf})::`));
  });

  test('passes correctly format options to `wawoff2.compress`', async () => {
    const formatOptions = { foo: 'bar' };
    await woff2Gen.generate(mockOptions(formatOptions), ttf);
    expect(wawoff2.compress).toHaveBeenCalledTimes(1);
  });
});
