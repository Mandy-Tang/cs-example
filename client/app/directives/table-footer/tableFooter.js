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
        $scope.page.index = $scope.page.current;

        $scope.$watch('page.current', function () {
          console.log('current page change');
          $scope.skipPage = $scope.page.current;
        });

        $scope.toPage = $scope.page.toPage;

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
