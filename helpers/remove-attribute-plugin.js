const HtmlWebpackPlugin = require('html-webpack-plugin');

class RemoveAttributePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveAttributePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'RemoveAttributePlugin',
        (data, cb) => {
          const regex = /data-background="[^"]*"/g;
          data.html = data.html.replace(regex, '');
          cb(null, data);
        }
      );
    });
  }
}

module.exports = RemoveAttributePlugin;