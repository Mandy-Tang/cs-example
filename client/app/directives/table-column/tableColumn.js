/**
 * Created by mandy on 16-4-25.
 */
(function () {
  function tableColumn () {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        columns: '='
      },
      replace: true,
      templateUrl: '/app/directives/table-column/index.html'
    }
  }
  angular.module('app').directive('tableColumn', tableColumn);
})();
