/**
 * Created by mandy on 16-5-4.
 */
angular.module('app').filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}]);
