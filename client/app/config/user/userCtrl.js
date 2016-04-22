/**
 * Created by mandy on 16-4-19.
 */
'use strict';
(function () {
  function userCtrl ($scope, User) {
    'ngInject';
    $scope.users = [];
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

    $scope.page = {
      current: 5,
      rows: 15,
      totalPages: 12,
      totalRows: 100,
      skipPage: 1,
      toPage: function (page) {
        if (page > 0 && page <= this.totalPages) {
          this.current = page;
          console.log(this.current);
        }
      }
    };
    User.getUsers(function (res) {
      $scope.users = res.data;
    });

  }
  angular.module('app.config').controller('userCtrl', userCtrl);
})();
