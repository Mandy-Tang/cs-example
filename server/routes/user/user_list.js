/**
 * Created by mandy on 16-4-21.
 */
var dataFile = require('../../utils/dataFile');
var _ = require('lodash');

exports = module.exports = function (req, res) {
  dataFile.readDataFile('users.json', function (data) {
    var pageIndex = parseInt(req.query.page_index);
    var pageRows = parseInt(req.query.page_rows);
    var users = JSON.parse(data);

    var resData;
    var totalRows;
    var totalPages;
    var showedUsers;

    // Search the user by name
    if (req.query.account) {
      showedUsers = _.filter(users, function (e) {
        return e.account === req.query.account;
      });
      totalRows = showedUsers.length || 0;
      totalPages = showedUsers.length || 0;
    }

    // Get the full user list
    else {
      totalRows = users.length;
      totalPages = Math.floor((totalRows - 1) / pageRows) + 1;
      var begin = (pageIndex - 1) * pageRows;
      var end = (begin + pageRows) < totalRows ? (begin + pageRows) : totalRows;
      showedUsers = users.slice(begin, end);
    }

    resData = {
      page_index: pageIndex,
      page_rows: pageRows,
      total_rows: totalRows,
      total_pages: totalPages,
      data: showedUsers
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(resData));
  });
};
