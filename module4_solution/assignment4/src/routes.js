(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: ''
      })

      // Categories list page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
        controller: '',
        resolve: {
          items: ['', function () { }]
        }
      })

      // Items for Category List Page
      .state('items', {
        url: '/items/{categoryId}',
        templateUrl: '',
        controller: '',
        resolve: {
          item: ['$stateParams', '', function ($stateParams) { }]
        }
      });
  }

})();
