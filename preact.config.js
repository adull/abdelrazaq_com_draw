export default function (config, env, helpers) {
    const jsLoader = config.module.rules.find(rule => rule.test && rule.test.test('.js'));
  
    if (jsLoader) {
      jsLoader.use.options.presets = [
        ...jsLoader.use.options.presets,
        require.resolve('@babel/preset-react')
      ];
    }
  
    return config;
  }
  