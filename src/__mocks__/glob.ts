const MOCK_GLOBS = {
  './valid/**/*.svg': [
    '/project/valid/foo.svg',
    '/project/valid/bar.svg',
    '/project/valid/sub/nested.svg',
    '/project/valid/sub/sub/nested.svg'
  ],
  './empty/**/*.svg': []
};

export const glob = async (pattern: string): Promise<string[]> => {
  const paths = MOCK_GLOBS[pattern];

  if (!paths) {
    throw new Error(`Invalid glob: ${pattern}`);
  }

  return paths;
};
