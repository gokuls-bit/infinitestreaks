/**
 * Style Dictionary Configuration — InfiniteStreaks Aurora Design System
 *
 * Transforms token JSON files → platform-specific outputs:
 * - React Native: JS/TS token objects
 * - Web: CSS custom properties
 * - iOS: Swift extensions
 * - JSON: Flat tokens for Figma plugin sync
 *
 * Run: npx style-dictionary build
 */
module.exports = {
  source: ['design-system/tokens/**/*.tokens.json'],

  platforms: {
    // ── React Native (TypeScript) ────────────────────────────────────────
    reactNative: {
      transformGroup: 'react-native',
      buildPath: 'design-system/dist/',
      files: [
        {
          destination: 'aurora-tokens.ts',
          format: 'javascript/es6',
        },
        {
          destination: 'aurora-tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },

    // ── Web (CSS Custom Properties) ──────────────────────────────────────
    css: {
      transformGroup: 'css',
      buildPath: 'design-system/dist/',
      files: [
        {
          destination: 'aurora-tokens.css',
          format: 'css/variables',
          options: {
            showFileHeader: true,
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },

    // ── JSON (for Figma plugin / design tool sync) ───────────────────────
    json: {
      transformGroup: 'js',
      buildPath: 'design-system/dist/',
      files: [
        {
          destination: 'aurora-tokens-flat.json',
          format: 'json/flat',
        },
      ],
    },

    // ── iOS (Swift) ──────────────────────────────────────────────────────
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'design-system/dist/ios/',
      files: [
        {
          destination: 'AuroraTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'AuroraTokens',
        },
      ],
    },
  },
};
