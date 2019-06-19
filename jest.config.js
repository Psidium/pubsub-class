const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "test/implementation", "test/types"],
  transform: {
      ...tsjPreset.transform
  },
  testRegex: "(/test/.*|(\\.|/)(test|spec))\\.[jt]sx?$"
};
