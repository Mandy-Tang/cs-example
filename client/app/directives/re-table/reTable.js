/**
 * Created by mandy on 16-4-22.
 */
(function () {
  function reTable ($rootScope) {
    'ngInject';
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        options: '='
      },
      replace: true,
      templateUrl: '/app/directives/re-table/index.html',
      link: function ($scope, $elem, $attr) {

        $scope.columnMenus = { // Map to control the columns' showing
          username: {label: '用户名', show: true},
          realname: {label: '真实姓名', show: true},
          role_id: {label: '角色', show: true},
          email: {label: '邮箱', show: true},
          telephone: {label: '电话', show: true},
          description: {label: '描述', show: true},
          created_time: {label: '创建时间', show: true},
          locked: {label: '锁定状态', show: true}
        };
      }
    }
  }
  angular.module('app').directive('reTable', reTable);
})();
