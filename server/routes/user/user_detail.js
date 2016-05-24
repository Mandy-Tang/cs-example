/**
 * Created by Mandy on 2015/10/15.
 */
var dataFile = require('../../utils/dataFile');
var _ = require('lodash');

exports = module.exports = function (req, res) {
  dataFile.readDataFile('users.json', function (data) {
    var users = JSON.parse(data);

    var userIndex = _.findIndex(users, function (e) {
      return parseInt(e.id) === 1;
    });

    var user = users[userIndex];
    user.loginTime = Date.now() - 90676;
    user.logoutTime = Date.now() - 70067;
    user.updateTime = Date.now() - 999998;
    user.expireDate = Date.now() + 3600000;
    user.loginIp = '10.4.4.36';

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(user));
  });
};
