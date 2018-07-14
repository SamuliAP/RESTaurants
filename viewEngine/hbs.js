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

  hbs.registerHelper('ifEquals', function(item1, item2, options) {
    return item1 == item2 ? options.fn(this) : options.inverse(this) 
  })

  hbs.registerHelper('ifEqualsOr', function(item1, item2, item3, options) {
    return item1 == item2 ? options.fn(this) : item3 ? options.fn(this) : options.inverse(this) 
  })
}