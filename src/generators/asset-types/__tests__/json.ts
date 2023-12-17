import { DEFAULT_OPTIONS } from '../../../constants';
import { OtherAssetType } from '../../../types/misc';
import jsonGen from '../json';

const mockCodepoints = { foo: 'oof', bar: 'baz' };

const mockOptions = (jsonOptions: any = {}) =>
  ({
    codepoints: mockCodepoints,
    formatOptions: { [OtherAssetType.JSON]: jsonOptions }
  }) as any;

const renderAndParse = async (jsonOptions?: any) =>
  JSON.parse(
    (await jsonGen.generate(mockOptions(jsonOptions), null)) as string
  );

describe('`JSON` asset generator', () => {
  test('renders expected JSON containing the codepoints map', async () => {
    expect(await renderAndParse()).toEqual({
      foo: 'oof',
      bar: 'baz'
    });
  });

  test('calls JSON.stringify with correct indentation', async () => {
    const stringifySpy = jest.spyOn(JSON, 'stringify');

    await renderAndParse(DEFAULT_OPTIONS.formatOptions.json);

    expect(stringifySpy).toHaveBeenCalledTimes(1);
    expect(stringifySpy).toHaveBeenCalledWith(
      mockCodepoints,
      null,
      expect.any(Number)
    );

    stringifySpy.mockClear();

    await renderAndParse({ indent: 2 });

    expect(stringifySpy).toHaveBeenCalledTimes(1);
    expect(stringifySpy).toHaveBeenCalledWith(mockCodepoints, null, 2);
  });
});
