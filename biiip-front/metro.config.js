// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Obtenez la configuration par défaut de Metro pour Expo
const config = getDefaultConfig(__dirname);

// Modifiez le transformer pour inclure react-native-svg-transformer
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Modifiez le resolver pour gérer les fichiers SVG
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// Appliquez la configuration NativeWind
module.exports = withNativeWind(config, { input: './global.css' });
