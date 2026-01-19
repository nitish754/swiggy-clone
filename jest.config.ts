/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/modules/**/__tests__/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
