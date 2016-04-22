/**
 * Created by mandy on 16-4-19.
 */
'use strict';
(function () {
  function userCtrl ($scope, User) {
    'ngInject';
    $scope.data = [];
    $scope.page = {
      current: 5,
      rows: 15,
      totalPages: 12,
      totalRows: 100,
      toPage: function (page) {
        console.log('request page ' + page);
      }
    };
    $scope.options = {
      columns: {
        username: {label: '用户名', show: true, filter: 'filter_username', sort: 'order_username'},
        realname: {label: '真实姓名', show: true, filter: 'filter_realname', sort: 'order_realname'},
        role_id: {label: '角色', show: true, filter: 'filter_role_id', sort: 'order_realname'},
        email: {label: '邮箱', show: true, filter: 'filter_email', sort: 'order_email'},
        telephone: {label: '电话', show: true, filter: 'filter_telephone', sort: 'order_telephone'},
        description: {label: '描述', show: true, filter: 'filter_description'},
        created_time: {label: '创建时间', show: true, filter: 'filter_created_time', filterType: 'time', sort: 'order_realname'},
        locked: {label: '锁定状态', show: true, filter: 'filter_locked', filterType: 'select', sort: 'order_realname'}
      },
      filterFlag: true,
      sortFlag: true,
      searchFlag: true,
      pageFlag: true,
      page: {
        current: 5,
        rows: 15,
        totalPages: 12,
        totalRows: 100,
        toPage: function (page) {
          console.log('request page ' + page);
        }
      }
    };
    User.getUsers(function (res) {
      $scope.data = res.data;
    });

  }
  angular.module('app.config').controller('userCtrl', userCtrl);
})();
