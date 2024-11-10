module.exports = {
  watch: false,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  maxWorkers: 2,
  moduleNameMapper: {
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^engine/(.*)$': '<rootDir>/src/engine/$1',
    '^loades/(.*)$': '<rootDir>/src/loades/$1',
    '^models/(.*)$': '<rootDir>/src/models/$1',
    '^plugins/(.*)$': '<rootDir>/src/plugins/$1',
    '^services/(.*)$': '<rootDir>/src/services/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/specs/__mock__/prisma-mock.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    'src/app.ts',
    '!src/index.ts',
    '!src/api/routes/**',
    '!src/models/**',
    '!src/plugins/**',
    '!src/engine/**',
  ],
  coverageReporters: ['json', 'text', 'text-summary', 'cobertura'],
  reporters: ['default', 'jest-junit'],
};
