/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  // Тестовые файлы
  testMatch: ['**/__tests__/**/*.test.js'],
  // Генерация покрытия кода
  collectCoverage: false,
  coverageDirectory: 'coverage', // папка для отчётов

  // Какие файлы включать в покрытие
  collectCoverageFrom: [
    'src/**/*.js',
  ],
}

