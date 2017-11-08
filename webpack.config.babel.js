import { join } from 'path';

const include = join(__dirname, 'src');

export default {
  entry: join(__dirname, 'src', 'index.js'),
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include,
      },
    ],
  },
}
