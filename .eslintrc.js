// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "unicorn",
    "jsdoc"
  ],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/ban-types": ["error",
      {
        types: {
          "Object": {
            message: "Avoid using the `Object` type, aight? Didja mean `object`?"
          },
          "Function": {
            message: "Avoid using the `Function` type, aight? Prefer a specific function type, like `() => void`."
          },
          "Boolean": {
            message: "Avoid using the `Boolean` type, aight? Didja mean `boolean`?"
          },
          "Number": {
            message: "Avoid using the `Number` type, aight? Didja mean `number`?"
          },
          "String": {
            message: "Avoid using the `String` type, aight? Didja mean `string`?"
          },
          "Symbol": {
            message: "Avoid using the `Symbol` type, aight? Didja mean `symbol`?"
          },
          "{}": false
        }
      }
    ],
    "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/member-delimiter-style": ["error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/naming-convention": ["error",
      { selector: "default", format: ["camelCase", "PascalCase", "UPPER_CASE"], leadingUnderscore: "allow" },
      { selector: "property", format: null }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/quotes": ["error", "double", { avoidEscape: true }],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/type-annotation-spacing": "error",
    "arrow-parens": ["off", "always"],
    "brace-style": ["off", "off"],
    "eol-last": "error",
    "id-blacklist": ["error", "any", "Number", "number", "String", "string", "Boolean", "boolean", "Undefined"],
    "id-match": "error",
    "no-eval": "error",
    "no-invalid-this": "off",
    "no-irregular-whitespace": "off",
    "no-nested-ternary": "off",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": "off",
    "prefer-const": "error",
    "no-param-reassign": "off",
    "space-in-parens": ["off", "never"],
    "spaced-comment": ["error", "always", { markers: ["/"] }],
    "no-console": ["warn"],
    "quote-props": ["error", "consistent-as-needed"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/strict-boolean-expressions": [
      "off",
      {
        allowString: false,
        allowNumber: false,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: true
      }
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "unicorn/prefer-ternary": "warn",
    "jsdoc/require-jsdoc": [
      "warn",
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: false
        }
      }
    ]
  }
};
