import type ttf2woff2Type from 'ttf2woff2' with {
  'resolution-mode': 'import'
};
import { FontGeneratorOptions } from '../../../types/generator';
import woff2Gen from '../woff2';

const ttf2woff2 = jest.requireMock('ttf2woff2') as jest.Mock<
  typeof ttf2woff2Type
>;

jest.mock('ttf2woff2', () =>
  jest.fn(content => ({ buffer: `::woff2(${content})::` }))
);

const mockOptions = (woffOptions = { __mock: 'options__' } as any) =>
  ({}) as unknown as FontGeneratorOptions;

const ttf = '::ttf::' as unknown as Buffer;

describe('`WOFF2` font generator', () => {
  beforeEach(() => {
    ttf2woff2.mockClear();
  });

  test('resolves with the correctly processed return value of `ttf2woff2`', async () => {
    const result = await woff2Gen.generate(mockOptions(), ttf);
    expect(ttf2woff2).toHaveBeenCalledTimes(1);
    expect(ttf2woff2).toHaveBeenCalledWith(ttf);
    expect(result).toEqual(Buffer.from(`::woff2(${ttf})::`));
  });

  test('passes correctly format options to `ttf2woff2`', async () => {
    const formatOptions = { foo: 'bar' };
    await woff2Gen.generate(mockOptions(formatOptions), ttf);
    expect(ttf2woff2).toHaveBeenCalledTimes(1);
  });
});
