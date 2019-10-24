// module.exports = require('@plone/volto/babel');


const baseCfg = require('@plone/volto/babel');
// "react-loadable/babel"

module.exports = function(api) {
    const voltoConfig = baseCfg(api)
    const presets = voltoConfig.presets;
    const plugins = [...voltoConfig.plugins, "react-loadable/babel"];
    return {
      plugins,
      presets,
    };
  };
  