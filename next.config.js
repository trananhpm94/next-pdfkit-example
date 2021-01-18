module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      fs: "pdfkit/js/virtual-fs.js",
    };
    config.module.rules.push(
      ...[
        {
          enforce: "post",
          test: /fontkit[/\\]index.js$/,
          loader: "transform-loader?brfs",
        },
        {
          enforce: "post",
          test: /unicode-properties[/\\]index.js$/,
          loader: "transform-loader?brfs",
        },
        {
          enforce: "post",
          test: /linebreak[/\\]src[/\\]linebreaker.js/,
          loader: "transform-loader?brfs",
        },
        { test: /components[/\\]assets/, loader: "arraybuffer-loader" },
        { test: /\.afm$/, loader: "raw-loader" },
      ]
    );
    return config;
  },
};
