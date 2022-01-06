var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');

var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`nasinet-element-ui_fb/packages/${key}`] = `nasinet-element-ui_fb/lib/${key}`;
});

externals['nasinet-element-ui_fb/src/locale'] = 'nasinet-element-ui_fb/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`nasinet-element-ui_fb/src/utils/${file}`] = `nasinet-element-ui_fb/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`nasinet-element-ui_fb/src/mixins/${file}`] = `nasinet-element-ui_fb/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`nasinet-element-ui_fb/src/transitions/${file}`] = `nasinet-element-ui_fb/lib/transitions/${file}`;
});

externals = [
  Object.assign(
    {
      vue: 'vue'
    },
    externals
  ),
  nodeExternals()
];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'nasinet-element-ui_fb': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
