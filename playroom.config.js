module.exports = {
  components: './index.ts',
  outputPath: './playroom-out',
  title: 'MUI Primitives',
  widths: [320, 600, 960, 1280, 1920],
  port: 2223,
  snippets: './playroom/snippets.tsx',
  frameComponent: './playroom/Frame.tsx',
  openBrowser: false,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('next/babel')],
            plugins: ['babel-plugin-styled-components'],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
  }),
}
