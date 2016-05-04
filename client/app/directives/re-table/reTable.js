/**
 * Created by mandy on 16-4-22.
 */
(function () {
  function reTable ($http, $timeout) {
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
            console.log($scope.filter);
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
          console.log($scope.sort)
        }

        function initPage () {
          options.pageFlag = 'page' in options;
          if (options.pageFlag) {
            $scope.options.page.toPage = function (page) {
              if (page > 0 && page <= $scope.options.page.totalPages) {
                console.log(page);
                console.log('go to page ' + $scope.options.page.index);
                search(page, function (res) {
                  $scope.options.page.current = $scope.options.page.index = parseInt(res.page_index);
                  $scope.options.page.totalPages = parseInt(res.total_pages);
                  $scope.options.page.totalRows = parseInt(res.total_rows);
                });
              }
            };
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

        function createQuery () {
          var query = {};
          if (options.pageFlag) {
            query.page_index = options.page.index;
            query.page_rows = options.page.rows;
          }
          if (options.searchFlag && $scope.searchValue) {
            console.log($scope.searchValue);
            query[options.search.name] = $scope.searchValue;
          }
          if (options.filterFlag) {
            for (var e in $scope.filter) {
              if ($scope.filter[e] || $scope.filter[e] === 0) {
                query[e] = $scope.filter[e];
              }
            }
          }
          if (options.sortFlag) {
            console.log($scope.sort.name);
            if ($scope.sort.name) {
              query[$scope.sort.field] = $scope.sort.how;
            }
          }
          return query;
        }

        function search (pageIndex, next) {
          console.log($scope.options);
          var argLength = arguments.length;
          if (argLength == 2) {
            $scope.options.page.index = pageIndex;
            $http.get(options.url, {params: createQuery()}).success(function (res) {
              $scope.data = res.data;
              next(res);
            });
          } else if (argLength == 1) {
            if (typeof arguments[0] == 'number') {
              $scope.options.page.index = arguments[0];
              $http.get(options.url, {params: createQuery()}).success(function (res) {
                $scope.data = res.data;
              });
            } else if (typeof arguments[0] == 'function') {
              $http.get(options.url, {params: createQuery()}).success(function (res) {
                $scope.data = res.data;
                next(res);
              });
            }
          } else {
            $http.get(options.url, {params: createQuery()}).success(function (res) {
              $scope.data = res.data;
            });
          }
        }

        $scope.search = function () {
          if (options.pageFlag) {
            return $scope.options.page.toPage(1);
          }
          else {
            return search;
          }
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
              $scope.options.page.toPage(1);
            }
          }
        };

        initTable();
        $scope.search();
      }
    }
  }
  angular.module('app').directive('reTable', reTable);
})();
