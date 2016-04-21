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

      }
    }
  }
  angular.module('app').directive('tableFooter', tableFooter);
})();
