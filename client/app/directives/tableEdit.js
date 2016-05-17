/**
 * Created by tangman on 2016/5/10.
 */
(function () {
  function tableEdit ($timeout, $compile) {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        edit: '='
      },
      replace: true,
      template: '<div class="table-edit"></div>',
      link: function ($scope, $elem, $attr) {
        $timeout(function () {
          angular.forEach($scope.edit, function (value, key) {
            var html = $compile(value.html)($scope);
            html.on('click', value.handler);
            $elem.append(html);
          })
        });
      }
    }
  }
  angular.module('app').directive('tableEdit', tableEdit);
})();
