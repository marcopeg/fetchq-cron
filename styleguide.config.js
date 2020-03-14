const path = require('path');
const makeCRAWebpackConfig = require('react-scripts/config/webpack.config.js');

module.exports = {
  components: 'src/components/**/*.js',
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
        },
      ],
    },
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguidist/Wrapper'),
  },
  context: {
    moment: 'moment',
  },
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.devServer = {
      disableHostCheck: true,
    };
    return webpackConfig;
  },
};
