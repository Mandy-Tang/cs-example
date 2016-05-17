var apiRoot = '/api/v1';
var dataFile = require('../utils/dataFile');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index');
  });

  app.get('/index', function (req, res) {
    if (app.get('env') === 'development') {
      res.render('index_dev');
    }
    else {
      res.render('index');
    }
  });

  app.route(apiRoot + '/users').get(require('./user/user_list'));
  // Get the roles list
  app.route(apiRoot + '/roles').get(require('./role/role_list'));

};
