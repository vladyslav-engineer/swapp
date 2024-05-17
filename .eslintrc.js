module.exports = {
  env: {
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': 0,
  },
  ignorePatterns: [
    'node_modules',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
    'tailwind.config.js',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
