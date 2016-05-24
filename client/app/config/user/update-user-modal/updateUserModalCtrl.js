function updateUserModalCtrl ($scope, User, Alert, $uibModalInstance, $rootScope, roleOptions, selectedUser, _) {
  'ngInject';
  $scope.roleOptions = roleOptions;
  $scope.user = _.clone(selectedUser);


  $scope.ok = function () {
    User.create($scope.user).then(function (res) {
      if (res.status_message_id == parseInt(100121)) {
        Alert.success($rootScope.getWord('操作成功'), '');
        $uibModalInstance.close('success');
      }
      else {
        Alert.error($rootScope.getWord('操作失败'), '');
      }
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}
angular.module('app.config').controller('updateUserModalCtrl', updateUserModalCtrl);
