// src/theme/tokens.js
const rawTokens = require('./token.json');

function resolveAlias (value, collections) {
  if (typeof value === 'object' && value.collection && value.name) {
    const col = collections.find(c => c.name === value.collection);
    if (!col) return null;
    const mode = col.modes[0];
    const variable = mode.variables.find(v => v.name === value.name);
    return variable.isAlias ? resolveAlias(variable.value, collections) : variable.value;
  }
  return value;
}

function transformTokens (data) {
  const { collections } = data;

  const colors = {};
  const spacing = {};
  const fonts = {};

  for (const collection of collections) {
    for (const mode of collection.modes) {
      for (const variable of mode.variables) {
        const { name, type, value, isAlias } = variable;
        const finalValue = isAlias ? resolveAlias(value, collections) : value;
        const key = name
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/\//g, '-')
          .replace(/,/g, '');

        if (type === 'color') {
          colors[key] = finalValue;
        } else if (type === 'number') {
          spacing[key] = `${finalValue}px`;
        } else if (type === 'string' && name.includes('font/family')) {
          fonts[key] = finalValue;
        }
      }
    }
  }

  return { colors, spacing, fonts };
}

const tokens = transformTokens(rawTokens);
module.exports = tokens;
