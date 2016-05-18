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
                columns[i].filter = columns[i].name;
                $scope.filter[columns[i].name] = '';
              }
            }
            $scope.options.filter = $scope.filter;
          }
        }

        /**
         * Init $scope.sort according to options.sortFlag
         * Default value in options.sortFlag is false, which means there is no sort feature
         */
        function initSort () {
          if ('sortFlag' in options && options.sortFlag) {
            $scope.sort = {name: '', field: '', how: ''};
            $scope.options.sort = $scope.sort;
          }
        }

        /**
         * Init pageFlag and toPage function
         */
        function initPage () {
          options.pageFlag = 'page' in options;
          if (options.pageFlag) {
            $scope.options.page.toPage = function (page) {
              if (page > 0 && page <= $scope.options.page.totalPages) {
                doSearch(page, function (res) {
                  $scope.options.page.current = $scope.options.page.index = parseInt(res.page_index);
                  $scope.options.page.totalPages = parseInt(res.total_pages);
                  $scope.options.page.totalRows = parseInt(res.total_rows);
                });
              }
            };
          }
        }

        /**
         * Init htmlFlag
         */
        function initHtml () {
          options.htmlFlag = false;
          for (var i = 0; i < columns.length; i++) {
            if ('html' in columns[i]) {
              if (!options.htmlFlag) {
                options.htmlFlag = true;
              }
            }
          }
        }

        /**
         * Init searchFlag
         */
        function initSearchInput () {
          if ('search' in options) {
            options.searchFlag = true;
            options.search.value = '';
          }
        }


        function initCheckbox () {
          if (options.checkboxFlag) {
            options.checkbox = {};
            options.checkbox.checkedList = [];
            options.checkbox.toggle = function ($index) {
              var idx = options.checkbox.checkedList.indexOf($index);
              if( idx > -1 ){
                options.checkbox.checkedList.splice(idx, 1);
              }
              else{
                options.checkbox.checkedList.push($index);
              }
              console.log(options.checkbox.checkedList.length)
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
          initHtml();
          initSearchInput();
          initCheckbox();
          options.editFlag = 'edit' in options;
          options.tableRowFlag = 'tableRowOptions' in options;
          options.toolbarFlag = options.searchFlag || options.editFlag || options.tableRowFlag || options.tableColumnFlag;

        }

        /**
         * Create query object when search data
         * @returns {Object}
         */
        function createQuery () {
          if ('createQuery' in options) {
            if (typeof options.createQuery == 'function') {
              return options.createQuery();
            }
          } else {
            var query = {};
            if (options.pageFlag) {
              query.page_index = options.page.index;
              query.page_rows = options.page.rows;
            }
            if (options.searchFlag && options.search.value) {
              query[options.search.name] = options.search.value;
            }
            if (options.filterFlag) {
              for (var e in $scope.filter) {
                if ($scope.filter[e] || $scope.filter[e] === 0 || typeof $scope.filter[e] == 'boolean' ) {
                  query[e] = $scope.filter[e];
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
        }

        /**
         * Search data
         * @param {Number} pageIndex - page turning to
         * @param {Function} next - callback
         */
        function doSearch (pageIndex, next) {
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

        /**
         * Determine doSearch function used in this table according to option.pageFlag
         * @returns {Function} - doSearch function used in table
         */
        $scope.doSearch = options.doSearch = function () {
          if (options.pageFlag) {
            return $scope.options.page.toPage(1);
          }
          else {
            return doSearch;
          }
        };

        /**
         * Sort data in table according to the sort column
         * @param {Number} $index - index in options.column
         * @param {Object} $event - click event when click the sortable column header of table
         */
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
        $scope.doSearch();
      }
    }
  }
  angular.module('app').directive('reTable', reTable);
})();
