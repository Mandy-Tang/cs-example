/**
 * Created by mandy on 16-5-17.
 */
var dataFile = require('../../utils/dataFile');

exports = module.exports = function (req, res) {
  var resData;
  dataFile.readDataFile('roles.json', function (data) {
    if (req.query.page) {
      var pageIndex = parseInt(req.query.page);
      var pageRows = parseInt(req.query.rows);
      var roles = JSON.parse(data);
      var totalRows = roles.length;
      var totalPages = Math.floor((totalRows - 1) / pageRows) + 1;

      var begin = (pageIndex - 1) * pageRows;
      var end = (begin + pageRows) < totalRows ? (begin + pageRows) : totalRows;
      var showedRoles = roles.slice(begin, end);

      resData = {
        page_index: pageIndex,
        page_rows: pageRows,
        total_rows: totalRows,
        total_pages: totalPages,
        data: showedRoles
      };
    }
    else {
      resData = {
        data: JSON.parse(data)
      };
    }


    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(resData));
  });
};
