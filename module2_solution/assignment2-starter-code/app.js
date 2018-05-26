(function () {
    'use strict'

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buy = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex)
        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

    }



    function ShoppingListCheckOffService() {
        var service = this;

        // List of to buy items
        var toBuyItems = [
            {
                name: 'cookies',
                quantity: '10'
            },
            {
                name: 'chips',
                quantity: '4'
            },
            {
                name: 'water',
                quantity: '10'
            },
            {
                name: 'milk',
                quantity: '5'
            },
            {
                name: 'wine',
                quantity: '2'
            },
        ];


        // List of bought items
        var boughtItems = [];

        service.buyItem = function (itemIndex) {
            boughtItems.push(toBuyItems[itemIndex])
            toBuyItems.splice(itemIndex, 1);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }



})()