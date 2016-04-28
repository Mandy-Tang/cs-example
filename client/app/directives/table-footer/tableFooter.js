/**
 * Created by mandy on 16-4-21.
 */
(function () {
  function tableFooter () {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        search: '=',
        page: '='
      },
      replace: true,
      templateUrl: '/app/directives/table-footer/index.html',
      link: function ($scope, $elem, $attr) {
        $scope.skipPage = $scope.page.current;
        $scope.page.index = $scope.page.current;

        $scope.$watch('page.current', function () {
          console.log('current page change');
          $scope.skipPage = $scope.page.current;
        });

        $scope.toPage = function (page) {
          if (page > 0 && page <= $scope.page.totalPages) {
            console.log(page);
            $scope.page.index = page;
            console.log('go to page ' + $scope.page.index);
            $scope.search(function (res) {
              $scope.page.current = $scope.page.index = parseInt(res.page_index);
              $scope.page.totalPages = parseInt(res.total_pages);
              $scope.page.totalRows = parseInt(res.total_rows);
            });
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
