/**
 * Created by mandy on 16-4-22.
 */
(function () {
  function reTable ($http, $q, _) {
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
                var filter = columns[i].filter;
                switch (typeof filter) {
                  case 'string':
                    $scope.filter[filter] = '';
                    break;
                  case 'boolean':
                    break;
                  case 'object':
                    if (columns[i].filterType == 'dateRangePicker') {
                      if (filter.length == 2) {
                        $scope.filter[filter[0]] = '';
                        $scope.filter[filter[1]] = '';
                      } else if (filter.length == 1) {
                        $scope.filter[filter[0]] = '';
                      }
                    }
                    break;
                  default :
                    break;
                }
              }  else {
                columns[i].filter = columns[i].name;
                $scope.filter[columns[i].name] = '';
              }
            }
            if ($scope.options.hasOwnProperty('filter')) {
              for (var i in $scope.options.filter) {
                $scope.filter[i] = $scope.options.filter[i];
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
              if ((page > 0 && page <= $scope.options.page.totalPages) || page == 1) {
                doSearch(page).then(function (res) {
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

        /**
         * Rest checkbox when doSearch
         */
        function resetCheckbox () {
          console.log('reset checkbox')
          options.checkbox.checkedList = [];
          options.checkbox.checkedAll = false;
          console.log($elem.find('input[type="checkbox"]'))
          $elem.find('input[type="checkbox"]').attr('checked', false);
        }

        /**
         * Init checkbox
         */
        function initCheckbox () {
          if (options.checkboxFlag) {
            options.checkbox = {};
            options.checkbox.checkedList = [];
            options.checkbox.checkedAll = false;
            options.checkbox.toggle = function ($index) {
              var idx = options.checkbox.checkedList.indexOf($index);
              if( idx > -1 ){
                options.checkbox.checkedList.splice(idx, 1);
              }
              else{
                options.checkbox.checkedList.push($index);
              }
              console.log(options.checkbox.checkedList)
            };
            options.checkbox.toggleAll = function () {
              if (options.checkbox.checkedAll) {
                var length = $scope.data.length;
                if (options.checkbox.checkedList.length != length) {
                  var list = [];
                  for (var i = 0; i < length; i++) {
                    list.push(i);
                  }
                  options.checkbox.checkedList = _.clone(list);
                }
              } else {
                options.checkbox.checkedList = [];
              }
              console.log(options.checkbox.checkedList)
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
          options.detailFlag = 'detailHtml' in options;
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
         * search data
         * @param {Number} pageIndex
         * @returns {Promise}
         */
        function doSearch (pageIndex) {
          console.log(createQuery());
          var defer = $q.defer();
          if (arguments.length > 0 && typeof arguments[0] == 'number') {
            $scope.options.page.index = pageIndex;
          }
          $http.get(options.url, {params: createQuery()}).success(function (res) {
            $scope.data = res.data;
            if (options.detailFlag) {

            }
            if (options.checkboxFlag) {
              resetCheckbox();
            }
            defer.resolve(res);
          }).error(function (res) {
            defer.reject(res);
          });
          return defer.promise;
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
