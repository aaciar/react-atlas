var path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'lib'),
    publicPath: '/lib/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if(process.env.NODE_ENV === "production") {
  config.module.rules.push({
      test: /\.css$/,
      exclude: /\.global\.css$/,
      loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [ {
                       loader: 'css-loader',
                       query: {
                           modules: true,
                           importLoaders: 1,
                           localIdentName: 'ra_[name]__[local]',
                           minimize: true
                       }
                     },
                     'postcss-loader'
                     ]
                })
    }, {
	  test: /\.global\.css$/,
	  loader: ExtractTextPlugin.extract({
		  fallbackLoader: 'style-loader',
		  loader: [{
			  loader: 'css-loader',
			  query: {
				  importLoaders: 1,
				  minimize: true
			  }
		  },
			  'postcss-loader'
		  ]
	  })
  });
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new ExtractTextPlugin("atlasThemes.min.css"));
} else {
  config.module.rules.push({
    test: /\.css$/,
    loaders: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss-loader'
    ]
});
}

module.exports = function() {
  return config;
}
