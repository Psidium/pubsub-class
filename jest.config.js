const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "__tests__/implementation" ],
  transform: {
      ...tsjPreset.transform
  }
};
