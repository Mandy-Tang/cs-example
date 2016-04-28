/**
 * Created by mandy on 16-4-22.
 */
(function () {
  function reTable ($http) {
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

        var options = $scope.options;
        var columns = options.columns;

        /**
         * Init $scope.filter according to options.filterFlag and filter in each column
         * Default value in options.filterFlag is false, which means there is no filter
         * If (options.filterFlag)
         *    Check filter in each column, options.columns.filter is the filter name of each column, while false means no filter in this column
         */
        function initFilter () {
          if ('filterFlag' in options && options.filterFlag) {
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
          }
        }

        /**
         * Init $scope.sort according to options.sortFlag
         * Default value in options.sortFlag is false, which means there is no sort feature
         */
        function initSort () {
          if ('sortFlag' in options && options.sortFlag) {
            $scope.sort = {name: '', field: '', how: ''};
          }
        }

        function initPage () {
          options.pageFlag = 'page' in options;
          if (!('toPage' in options.page)) {
            options.page.toPage = function (page, next) {
              $scope.search();

            }
          }
        }

        /**
         * Init table
         */
        function initTable () {
          initFilter();
          initSort();
          initPage();
          options.tableRowFlag = 'tableRowOptions' in options;
          options.searchFlag = 'search' in options;
          options.editFlag = 'edit' in options;
        }

        initTable();

        function createQuery () {
          var query = {};
          if (options.pageFlag) {
            query.page_index = options.page.index;
            query.page_rows = options.page.rows;
          }
          if (options.searchFlag && $scope.searchValue) {
            query[options.search.name] = $scope.searchValue;
          }
          if (options.filterFlag) {
            for (var e in $scope.filter) {
              if (e.value || e.value === 0) {
                query[e.key] = e.value;
              }
            }
          }
          if (options.sortFlag) {
            if ($scope.sort.name) {
              query[$scope.sort.field] = $scope.sort.how;
            }
          }
          return query;
        }

        $scope.search = function (next) {
          console.log(createQuery());
          var argLength = arguments.length;
          $http.get(options.url, {params: createQuery()}).success(function (res) {
            $scope.data = res.data;
            if (argLength == 1) {
              next(res);
            }
          });
        };

        $scope.sortBy = function ($index, $event) {
          if (options.sortFlag) {
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

              $scope.search();
            }
          }
        }

      }
    }
  }
  angular.module('app').directive('reTable', reTable);
})();
