(function () {
    'use strict'

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems);


    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                menu: '=myMenu',
                title: '@myTitle',
            },
        };
        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        let menu = this;

        menu.searchedItem = "";

        menu.title = ""

        menu.getMatchedMenuItems = function () {
            MenuSearchService.getMatchedMenuItems(menu.searchedItem)
                .then(function (response) {
                    menu.found = response;
                    if (menu.searchedItem !== "") menu.title = "List of items containing the word: \" " + menu.searchedItem + "\""
                    return menu.found
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        }

        // this or menu?
        menu.removeItem = function (itemIndex) {
            this.lastRemoved = this.found[itemIndex].name;
            MenuSearchService.removeItem(itemIndex);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        let service = this;

        let foundItems = [];

        service.getMatchedMenuItems = function (searchedItem) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            })
                .then(function (result) {
                    if (searchedItem === "") foundItems = [];
                    else {
                        let resultItems = result.data.menu_items.filter(el => el.description.toLowerCase().indexOf(searchedItem) != -1)
                        foundItems = resultItems
                    }

                    return foundItems;
                });
        }

        service.removeItem = function (itemIndex) {
            foundItems.splice(itemIndex, 1);
        }

        service.getFoundItems = function () {
            return foundItems
        }


    }



})()