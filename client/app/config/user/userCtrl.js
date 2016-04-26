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
      //columns: {
      //  username: {label: '用户名', show: true, filter: 'filter_username', sort: 'order_username'},
      //  realname: {label: '真实姓名', show: true, filter: 'filter_realname', sort: 'order_realname'},
      //  role_id: {label: '角色', show: true, filter: 'filter_role_id', sort: 'order_realname'},
      //  email: {label: '邮箱', show: true, filter: 'filter_email', sort: 'order_email'},
      //  telephone: {label: '电话', show: true, filter: 'filter_telephone', sort: 'order_telephone'},
      //  description: {label: '描述', show: true, filter: 'filter_description'},
      //  created_time: {label: '创建时间', show: true, filter: 'filter_created_time', filterType: 'time', sort: 'order_realname'},
      //  locked: {label: '锁定状态', show: true, filter: 'filter_locked', filterType: 'select', sort: 'order_realname'}
      //},
      columns: [
        {name: 'username', label: '用户名', showed: true, filter: 'filter_username', placeholder: '用户名', sort: 'order_username'},
        {name: 'realname', label: '真实姓名', showed: true, filter: 'filter_realname', placeholder: '真实姓名', sort: 'order_realname'},
        {name: 'role_id', label: '角色', showed: true, filter: 'filter_role_id', placeholder: '角色', sort: 'order_realname'},
        {name: 'email', label: '邮箱', showed: true, filter: 'filter_email', placeholder: '邮箱', sort: 'order_email'},
        {name: 'telephone', label: '电话', showed: true, filter: 'filter_telephone', placeholder: '电话', sort: 'order_telephone'},
        {name: 'description', label: '描述', showed: true, filter: false, sort: false},
        {name: 'created_time', label: '创建时间', showed: true, filter: 'filter_created_time', placeholder: '创建时间', filterType: 'time', sort: 'order_realname'},
        {name: 'locked', label: '锁定状态', showed: true, filter: 'filter_locked', filterType: 'select', placeholder: '锁定状态', sort: 'order_realname'}
      ],
      tableColumnFlag: true,
      filterFlag: true,
      sortFlag: true,
      tableRowOptions: [{row: 15}, {row: 25}, {row: 50}, {row: 100}],
      search: {
        name: 'search'
      },
      edit: {
        createFlag: true,
        updateFlag: true,
        deleteFlag: true
      },
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
