module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@stylistic/js'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "object-curly-newline": ["error", {
      "ObjectPattern": { "multiline": true, "minProperties": 2 },
      "ImportDeclaration": { "multiline": true, "minProperties": 2 },
      "ExportDeclaration": { "multiline": true, "minProperties": 2 },
   }],
   "object-curly-spacing": ["error", "always"],
   "object-property-newline": ['error'],
   "space-before-blocks": ["warn", "always"],
   "semi-style": ["warn", "last"],
   "semi": ["warn", "always"]
  },
}
