module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Place your rules here
    'scope-enum': [
      2,
      'always',
      ['deps', 'deps-dev', 'config', 'hosting', 'content', 'logic', 'ui']
    ] // error if scope is given but not in provided list
  }
}
