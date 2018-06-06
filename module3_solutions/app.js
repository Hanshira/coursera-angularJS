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
                //onRemove: '&'
            },
        };
        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        let menu = this;

        menu.searchedItem = "";

        menu.title = "List of items conatining the word " + menu.searchedItem;

        menu.getMatchedMenuItems = function () {
            MenuSearchService.getMatchedMenuItems(menu.searchedItem)
                .then(function (response) {
                    menu.found = response;
                    console.log("menu.found ", menu.found)
                    return menu.found
                })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        }

        // this or menu?
        menu.removeItem = function (itemIndex) {
            console.log("'this' is: ", this);
            this.lastRemoved = this.found[itemIndex].name;
            console.log("last removed ", this.lastRemoved)
            MenuSearchService.removeItem(itemIndex);
            console.log("new list ", this.found)
        };

        menu.test = function () {
            console.log(menu.found);
            console.log(MenuSearchService.getFoundItems())
        }

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
                    let resultItems = result.data.menu_items.filter(el => el.description.toLowerCase().indexOf(searchedItem) != -1)
                    foundItems = resultItems
                    console.log("foundItems", foundItems)
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