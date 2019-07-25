const solidityLoaderOptions = {
  network: 'development',
  // you can stop loader from automatic compile/push/updgrade
  // action by setting disabled flag to true, but it will still
  // serve .json files from file system
  disabled: true,
};

module.exports = {
  solidityLoader: {
    test: /\.sol$/,
    use: [
      { loader: 'json-loader' },
      {
        loader: '@openzeppelin/solidity-loader',
        options: solidityLoaderOptions,
      },
    ],
  },
  solidityLoaderOptions,
};
