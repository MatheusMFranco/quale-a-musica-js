module.exports = {
    $schema: './node_modules/@stryker-mutator/core/schema/stryker-schema.json',
    mutate: [
      'src/**/*.js?(x)',
      '!src/**/*.spec.js?(x)',
      '!src/main.js',
      '!src/constants.js',
      '!src/setupTests.js',
      '!src/dist/**'
    ],
    mutator: {
      excludedMutations: [
        'ArrayDeclaration',
        'ConditionalExpression',
        'BlockStatement',
        'StringLiteral',
      ],
    },
    testRunner: 'vitest',
    reporters: ['progress', 'clear-text', 'html'],
    coverageAnalysis: 'off',
    ignoreStatic: false,
    warnings: { slow: false },
    testFiles: ['src/**/*.spec.js?(x)'],
    tempDirName: 'stryker-tmp',
  };