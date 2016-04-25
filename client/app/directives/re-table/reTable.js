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

        var columns = $scope.options.columns;

        /**
         * Init $scope.filter according to options.filterFlag and filter in each column
         * Default value in options.filterFlag is false, which means there is no filter
         * If (options.filterFlag)
         *    Check filter in each column, options.columns.filter is the filter name of each column, while false means no filter in this column
         */
        function initFilter () {
          if ('filterFlag' in $scope.options && $scope.options.filterFlag) {
            $scope.filter = {};
            for (var i = 0; i < columns.length; ++i) {
              if ('filter' in columns[i]) {
                if (columns[i].filter) {
                  $scope.filter[columns[i].filter] = '';
                }
              }  else {
                $scope.filter[columns[i].name] = '';
              }
            }
          } else {
            $scope.filter = null;
          }
        }

        /**
         * Init $scope.sort according to options.sortFlag
         * Default value in options.sortFlag is false, which means there is no sort feature
         */
        function initSort () {
          if ('sortFlag' in $scope.options && $scope.options.sortFlag) {
            $scope.sort = {name: '', field: '', how: ''};
          } else {
            $scope.sort = null;
          }
        }

        initFilter();
        initSort();

        $scope.sortBy = function ($index, $event) {
          if ($scope.sort) {
            var sortIn = 'sort' in columns[$index];
            var el = columns[$index];
            if (!sortIn || (sortIn && el.sort)) {
              if (!$scope.sort.name || $scope.sort.name != el.name) {
                $scope.sort.name = el.name;
                $scope.sort.field = sortIn ? el.sort : el.name;
                $scope.sort.how = 'asc';
              } else if ($scope.sort.name == columns[$index].name ) {
                $scope.sort.how = $scope.sort.how === 'asc' ? 'desc' : 'asc';
              }
              // Do search
              $scope.options.search();
            }
          }
        }
      }
    }
  }
  angular.module('app').directive('reTable', reTable);
})();
