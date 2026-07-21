module.exports = {
  testEnvironment: 'node',
  rootDir: './src',
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript' },
          target: 'es2021'
        },
        module: { type: 'commonjs' }
      }
    ]
  }
};
