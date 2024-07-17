module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'lib'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'jest'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/named": "off",
    "import/export": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-expressions": ["warn", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/jsx-filename-extension": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.prod.js',
      },
    },
  },
}
