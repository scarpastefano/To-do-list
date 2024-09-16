module.exports = {
    publicPath: './',  // Questo risolve il problema dei percorsi relativi
    configureWebpack: {
      resolve: {
        extensions: ['.js', '.vue', '.json'],  // Assicura che Webpack gestisca correttamente i file Vue e JS
      },
    },
  };
  