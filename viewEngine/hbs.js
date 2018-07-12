exports.initialize = (app) => {
  const hbs = require('express-hbs')

  let viewsDir = __dirname + '/../views/'

  app.engine('hbs', hbs.express4({
    partialsDir: viewsDir + 'partials',
    layoutsDir: viewsDir + 'layouts',
    defaultLayout: viewsDir + 'layouts/layout.hbs'
  }));
  
  app.set('view engine', 'hbs');
  app.set('views', viewsDir);
  
  // hbs helpers
  hbs.registerHelper('formatDate', function(date) {
    return date.toLocaleString()
  })
}