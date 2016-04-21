/**
 * Created by mandy on 16-4-21.
 */
var path = require('path');
var fs = require('fs');

var readDataFile = function (fileName, next) {
  var filePath = path.resolve(__dirname, '..', 'data', fileName);
  fs.readFile(filePath, function (err, data) {
    if (err) throw err;
    // var fileJSONData = JSON.parse(data);
    next(data);
  });
};

var writeDataFile = function (fileName, data, next) {
  var filePath = path.resolve(__dirname, '..', 'data', fileName);
  fs.writeFile(filePath, data, function (err) {
    if (err) throw err;
    next();
  });
};

module.exports = {
  readDataFile: function (fileName, next) {
    readDataFile(fileName, next);
  },
  writeDataFile: function (fileName, data, next) {
    writeDataFile(fileName, data, next);
  }
};
