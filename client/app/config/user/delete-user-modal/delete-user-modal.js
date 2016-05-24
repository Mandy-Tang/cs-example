function deleteUserModalCtrl ($scope, User, Alert, $uibModalInstance, $rootScope) {
  'ngInject';

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
angular.module('app.config').controller('deleteUserModalCtrl', deleteUserModalCtrl);
