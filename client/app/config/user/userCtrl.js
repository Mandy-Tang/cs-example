/**
 * Created by mandy on 16-4-19.
 */
'use strict';
(function () {
  function userCtrl ($scope, API_CONFIG, $uibModal, allRoleList, User) {
    'ngInject';

    var roleOptions = generateRoleOptions();
    /**
     *
     * @type {*[]} select options used in filter of column 'locked'
     */
    var lockedOptions = [
      {value: '', label: '请选择状态'},
      {value: true, label: '锁定'},
      {value: false, label: '正常'}
    ];

    /**
     *
     * @type {Array} data in table
     */
    $scope.data = [];


    // table options in table
    $scope.options = {
      columns: [
        {name: 'username', label: '用户名', showed: true, filter: 'filter_username', placeholder: '用户名', sort: 'order_username'},
        {name: 'realname', label: '真实姓名', showed: true, filter: 'filter_realname', placeholder: '真实姓名', sort: 'order_realname'},
        {name: 'role', label: '角色', showed: true, filter: 'filter_role_id', filterType: 'select', filterOptions: roleOptions, placeholder: '角色', sort: 'order_realname', html: roleHtml},
        {name: 'email', label: '邮箱', showed: true, filter: 'filter_email', placeholder: '邮箱', sort: 'order_email'},
        {name: 'telephone', label: '电话', showed: true, filter: 'filter_telephone', placeholder: '电话', sort: 'order_telephone'},
        {name: 'description', label: '描述', showed: true, filter: false, sort: false},
        {name: 'created_time', label: '创建时间', showed: true, filter: 'filter_created_time', placeholder: '创建时间', sort: 'order_realname', html: createdTimeHtml},
        {name: 'locked', label: '锁定状态', showed: true, filter: 'filter_locked', filterType: 'select', filterOptions: lockedOptions, placeholder: '锁定状态', sort: 'order_realname', html: lockedHtml},
        {name: 'handler', label: '操作', showed: true, filter: false, sort: false, html: handlerHtml, handler: [openUserDetail, openUpdateUserModal, openDeleteUserModal]}
      ],
      url: API_CONFIG.USERS,
      tableColumnFlag: true,
      filterFlag: true,
      sortFlag: true,
      checkboxFlag: true,
      detailHtml: detailHtml,
      tableRowOptions: [{row: 15}, {row: 25}, {row: 50}, {row: 100}],
      search: {
        name: 'search'
      },
      edit: {
        create: {
          html: '<a class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>',
          handler: openCreateUserModal
        },
        'delete': {
          html: '<a class="btn btn-primary btn-sm"><i class="fa fa-trash-o"></i></a>',
          handler: openDeleteUserModal
        }
      },
      page: {
        current: 1,
        rows: 15,
        totalPages: 1,
        totalRows: 1
      }
    };


    function generateRoleOptions () {
      var roleOptions = [{value: '', label: '请选择角色'}];
      var role;
      for (var i in allRoleList) {
        role = allRoleList[i];
        roleOptions.push({value: role.id, label: role.name});
      }
      return roleOptions;
    }


    /**
     * Generate html in td of 'locked' column
     * @param {Boolean} data - value of user.locked
     * @returns {string}
     */
    function lockedHtml (data) {
      var html = '';
      html += '<span class="label ';
      if (data) {
        html += 'label-warning">锁定';
      }
      else {
        html += 'label-info">正常';
      }
      html += '</span>';
      return html;
    }

    /**
     * Generate html in td of 'role' column
     * @param {Object} data - value of user.role
     * @returns {string}
     */
    function roleHtml (data) {
      return '<span>' + data.name + '</span>';
    }

    /**
     * Generate html in td of 'created_time' column
     * @param {Number} data
     * @returns {string}
     */
    function createdTimeHtml (data) {
      var date = new Date(parseInt(data));
      return '<span>' + date.toLocaleString() + '</span>';
    }

    function handlerHtml (el) {
      var html = '<i class="fa fa-info btn-text btn-info" title="详情" ng-click="(el2.handler[0])(el)"></i>';
      html += '<i class="fa fa-edit btn-text btn-primary" title="修改信息" ng-click="(el2.handler[1])(el)"></i>';
      html += '<i class="fa fa-undo btn-text btn-primary" title="重置密码" ng-click="(el2.handler[1])(el)"></i>';
      html += '<i ng-if="el.locked" class="fa fa-unlock btn-text btn-warning" title="解除锁定" ng-click="(el2.handler[1])(el)"></i>';
      html += '<i class="fa fa-trash btn-text btn-default" title="删除" ng-click="(el2.handler[2])(el)"></i>';
      return html;
    }

    function detailHtml (el) {
      return '<td colspan="10" class="td-detail" ng-show="el.detailOpened" ng-include="\'/app/config/user/user_detail.html\'"></td>';
    }

    function openCreateUserModal () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/config/user/create-user-modal/index.html',
        controller: 'createUserModalCtrl',
        size: 'md',
        resolve: {
          roleOptions: function () {
            return roleOptions;
          }
        }
      });
      modalInstance.result.then(function (result) {
        if (result == 'success') {
          $scope.options.doSearch(1);
        }
      });
    }
    function openUpdateUserModal (el) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/config/user/update-user-modal/index.html',
        controller: 'updateUserModalCtrl',
        size: 'md',
        resolve: {
          selectedUser: function () {
            return el;
          },
          roleOptions: function () {
            return roleOptions;
          }
        }
      });
      modalInstance.result.then(function (result) {
        if (result == 'success') {
          $scope.options.doSearch(1);
        }
      });
    }

    function openDeleteUserModal ($index) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/app/config/user/delete-user-modal/index.html',
        controller: 'deleteUserModalCtrl',
        size: 'md'
      });
      modalInstance.result.then(function (result) {
        if (result == 'success') {
          $scope.options.doSearch(1);
        }
      });
    }

    function openUserDetail (el) {
      if (el.detailOpened) {
        el.detailOpened = false;
      } else {
        for (var i in $scope.data) {
          $scope.data[i].detailOpened = false;
        }
        if (!el.hasOwnProperty('detail')) {
          User.getDetail(el.id).then(function (res) {
            el.detail = res;
          });
        }
        el.detailOpened = true;
      }
    }

  }
  angular.module('app.config').controller('userCtrl', userCtrl);
})();
