/**
 * Created by tangman on 2016/5/11.
 */
angular.module('app').filter('time_to_string', function () {
  return function (text) {
    var date = new Date(parseInt(text));
    return date.toLocaleString();
  }
});
