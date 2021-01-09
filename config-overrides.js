const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const path = require("path");
// ModuleScopePlugin 解决方案: https://www.codenong.com/44114436/
// module.exports = function override(config) {
//   config.resolve.plugins.forEach(plugin => {
//     if (plugin instanceof ModuleScopePlugin) {
//       plugin.allowedFiles.add(path.dirname("/redux-handwriting/"));
//     }
//   });

//   return config;
// };

module.exports = function override(config, env) {
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

  return config;
};