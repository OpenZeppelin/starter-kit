/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  // allow importing from outside of app/src folder, ModuleScopePlugin prevents this.
  const scope = config.resolve.plugins.findIndex(o => o.constructor.name === 'ModuleScopePlugin');
  if (scope > -1) {
    config.resolve.plugins.splice(scope, 1);
  }

  // add Zeppelin Solidity hot reloading support
  // have to insert before last loader, because CRA user 'file-loader' as default one
  config.module.rules.splice(config.module.rules - 2, 0,
    {
      test: /\.sol$/,
      use: [ 
        { loader: 'json-loader' },
        {
          loader: 'zeppelin-solidity-hot-loader',
          options: {
            network: 'development',
            // you can stop loader from automatic compile/push/updgrade
            // action by setting disabled flag to true, but it will still
            // serve .json files from file system
            disabled: false,
          },
        },
      ],
    }
  );

  return config;
}