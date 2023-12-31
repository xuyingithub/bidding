module.exports = {
  publicPath: "./",
  devServer: {
    port: "8080",
    open: true,
    proxy: {
      "/api": {
        target: "http://10.3.0.20:8080/",
        // target: "http://ztb.cloud.ccic-net.com.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
