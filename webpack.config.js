var path = require("path");

module.exports = {
  entry: "./src/frontend/index.tsx",
  output: {
     filename: 'bundle.js',
        path: __dirname + '/dist',
        publicPath:  __dirname + '/dist'
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        dgram: 'empty'
    },
}
