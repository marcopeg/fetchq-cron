const makeCRAWebpackConfig = require('react-scripts/config/webpack.config.js');

module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.devServer = {
      disableHostCheck: true,
    };
    return webpackConfig;
  },
  components: 'src/components/**/*.js',
};
