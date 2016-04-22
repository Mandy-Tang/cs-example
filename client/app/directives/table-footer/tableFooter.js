/**
 * Created by mandy on 16-4-21.
 */
(function () {
  function tableFooter () {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        page: '='
      },
      replace: true,
      templateUrl: '/app/directives/table-footer/index.html',
      link: function ($scope, $elem, $attr) {
        $scope.skipPage = $scope.page.current;

        $scope.$watch('page.current', function () {
          console.log('current page change');
          $scope.skipPage = $scope.page.current;
        });

        $scope.prevPage = function () {
          if ($scope.page.current - 1 > 0) {
            $scope.page.toPage($scope.page.current - 1);
          }
        };

        $scope.nextPage = function () {
          if ($scope.page.current + 1 <= $scope.page.totalPages) {
            $scope.page.toPage($scope.page.current + 1);
          }
        };

        $scope.toPage = function (page) {
          if (page > 0 && page <= $scope.page.totalPages) {
            $scope.page.current = page;
            console.log('go to page ' + $scope.page.current);
            $scope.page.toPage(page);
          }
        };

        $scope.skipToPage = function () {
          $scope.skipPage = parseInt($scope.skipPage);
          if ($scope.skipPage > 0 && $scope.skipPage <= $scope.page.totalPages) {
            $scope.page.current = $scope.skipPage;
            $scope.page.toPage($scope.skipPage);
          }
          else {
            $scope.skipPage = $scope.page.current;
          }
        };

        $scope.onSkipFocus = function () {
          $scope.skipPage = '';
        };

        $scope.onSkipBlur = function () {
          $scope.skipPage = $scope.page.current;
        };
      }
    }
  }
  angular.module('app').directive('tableFooter', tableFooter);
})();
