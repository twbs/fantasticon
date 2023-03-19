import { stat } from 'fs/promises';
import { checkPath } from '../fs-async';

const statMock = stat as any as jest.Mock;

jest.mock('fs/promises', () => ({
  stat: jest.fn()
}));

describe('Async FS utilities', () => {
  beforeEach(() => {
    statMock.mockClear();
  });

  describe('checkPath', () => {
    it('calls `stat` correctly and correctly check the existance of a path', async () => {
      const mockPath = '/dev/null';

      statMock.mockImplementationOnce(() => Promise.resolve());

      expect(await checkPath(mockPath)).toBe(true);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledWith(mockPath);

      statMock.mockClear();
      statMock.mockImplementationOnce((_, cb) => cb(new Error('Fail')));

      expect(await checkPath(mockPath)).toBe(false);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledWith(mockPath);
    });

    it('checks if given path is a directory when given as check type', async () => {
      const mockPath = '/dev/null';
      const isDirectory = jest.fn(() => false);

      statMock.mockImplementation(() => Promise.resolve( { isDirectory }));

      expect(await checkPath(mockPath, 'directory')).toBe(false);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledWith(mockPath);
      expect(isDirectory).toHaveBeenCalledTimes(1);

      isDirectory.mockImplementation(() => true);

      expect(await checkPath(mockPath, 'directory')).toBe(true);
    });

    it('checks if given path is a file when given as check type', async () => {
      const mockPath = '/dev/null';
      const isFile = jest.fn(() => false);

      statMock.mockImplementation(() =>  Promise.resolve({ isFile }));

      expect(await checkPath(mockPath, 'file')).toBe(false);
      expect(statMock).toHaveBeenCalledTimes(1);
      expect(statMock).toHaveBeenCalledWith(mockPath);
      expect(isFile).toHaveBeenCalledTimes(1);

      isFile.mockImplementation(() => true);

      expect(await checkPath(mockPath, 'file')).toBe(true);
    });
  });
});
