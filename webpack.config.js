module.exports = {
  module: {
    rules: [
      {
        test: /\.(mp4|mov)$/,
        loader: "file",
        type: "asset/resource",
        generator: {
          filename: "videos/[name].[ext]",
        },
      },
    ],
  },
};
