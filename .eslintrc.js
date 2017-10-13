module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:import/recommended'
  ],
  plugins: [
    'import',
    'flowtype'
  ],
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  settings: {
    'import/resolver': 'node'
  },
  rules: {
    'no-multi-spaces': ["error", { ignoreEOLComments: true }],
    'generator-star-spacing': 0, // temporary workaround for async/await https://github.com/eslint/eslint/issues/6274#issuecomment-234699117
    // Flow
    'flowtype/require-valid-file-annotation': [ 'error', 'always' ],
    'flowtype/define-flow-type': 'error',
    'flowtype/use-flow-type': 'error',
    'flowtype/space-after-type-colon': 'error',
    // Flow imports (see preset import above), need to turn off type import errors
    'no-duplicate-imports': 'off',
    'spaced-comment': 'off',
  }
}
