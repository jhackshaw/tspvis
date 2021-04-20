exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig
}) => {
  const config = getConfig();

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: {
      loader: "worker-loader",
      options: {
        inline: true
      }
    }
  });

  config.output.globalObject = "this";

  replaceWebpackConfig(config);
};
