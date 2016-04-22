/**
 * Created by mandy on 16-4-21.
 */
(function () {
  function tableFooter () {
    return {
      restrict: 'EA',
      scope: {
        page: '='
      },
      replace: true,
      templateUrl: '/app/directives/table-footer/index.html',
      link: function ($scope, $elem, $attr) {
        $scope.prevPage = function () {
          if ($scope.page.current - 1 > 0) {
            $scope.page.toPage($scope.page.current - 1);
          }
        };
        $scope.nextPage = function () {
          if ($scope.page.current + 1 <= $scope.page.totalPages) {
            $scope.page.toPage($scope.page.current + 1);
          }
        }
      }
    }
  }
  angular.module('app').directive('tableFooter', tableFooter);
})();
