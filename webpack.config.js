const path = require('path')
const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

const renderer = {
  entry: {
    renderer: path.resolve(src, 'renderer/renderer.ts'),
    'editor.worker': 'monaco-editor-core/esm/vs/editor/editor.worker.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(dist, 'renderer')
  },
  target: 'web',
  mode: 'development',
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    crypto: 'empty'
  },
  resolve: {
    alias: {
      'vscode': require.resolve('monaco-languageclient/lib/vscode-compatibility')
    },
    extensions: ['.mjs', '.js', '.json', '.ttf', '.ts', '.svelte']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          preprocess: require('svelte-preprocess')({})
        }
      }
    },
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.ttf$/,
      use: ['file-loader']
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader',
      exclude: /node_modules/
    }]
  },
  watchOptions: {
    poll: 1000
  }
}

const main = {
  entry: {
    main: path.resolve(src, 'main/main.ts')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(dist, 'main'),
    libraryTarget: 'commonjs',
  },
  target: 'node',
  mode: 'development',
  node: {
    fs: 'empty',
    child_process: 'empty',
    net: 'empty',
    crypto: 'empty'
  },
  externals: ['fsevents', 'electron', 'electron-reload', './../../node_modules/electron'],
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          preprocess: require('svelte-preprocess')({})
        }
      }
    },
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
        }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      loader: 'source-map-loader',
      exclude: /node_modules/
    }]
  },
  watchOptions: {
    poll: 1000
  }
}

module.exports = [renderer, main]