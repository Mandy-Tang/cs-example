/**
 * Created by mandy on 16-4-25.
 */
(function () {
  function tableRow () {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        options: '='
      },
      replace: true,
      template: '<select class="form-control input-sm" ng-change="options.page.toPage(1)" ng-model="options.page.rows" ng-options="a.row as a.row for a in options.tableRowOptions"></select>',
      link: function ($scope) {
        //$scope.tableRowOptions = [15, 25, 50, 100]
      }

    }
  }
  angular.module('app').directive('tableRow', tableRow);
})();
