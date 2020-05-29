module.exports = {
  components: './index.ts',
  outputPath: './playroom-out',
  title: 'MUI Primitives',
  widths: [320, 600, 960, 1280, 1920],
  port: 2223,
  snippets: './playroom/snippets.tsx',
  frameComponent: './playroom/Frame.tsx',
  // baseUrl: '/playroom',
  openBrowser: false,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              require.resolve('@babel/plugin-proposal-export-default-from'),
              [
                'module-resolver',
                {
                  root: ['.'],
                  alias: {
                    modules: './modules',
                    components: './components',
                  },
                },
              ],
            ],
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('next/babel'),
            ],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
  }),
}