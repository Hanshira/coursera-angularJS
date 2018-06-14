// create a service called MenuDataService in it. 
//  2 methods:
// getAllCategories - this method should return a promise 
// which is a result of using the $http service, 
// using the following REST API endpoint: 
// https://davids-restaurant.herokuapp.com/categories.json

// getItemsForCategory(categoryShortName) - 
// this method should return a promise which is a 
// result of using the $http service, using the following
//  REST API endpoint: 
//  https://davids-restaurant.herokuapp.com/menu_items.json?category=, 
// where, before the call to the server, your code should append 
// whatever categoryShortName value was passed in as an argument 
// into the getItemsForCategory method.


(function () {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService);


    MenuDataService.$inject = ['$q', 'http']
    function MenuDataService($q, $http) {

        let service = this;

        service.getMenuCategories = function () {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/categories.json")
            });
            console.log("getMenuCategories ", reponse)
            return response;
        };

        service.getItemsForCategory = function (categoryShortName) {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json?"),
                params: {
                    category: categoryShortName
                }
            });
            console.log("getItemsForCategory ", reponse)
            return response;
        };

    }



})

