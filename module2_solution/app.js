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
                quantity: '10 bags'
            },
            {
                name: 'chips',
                quantity: '5 bags'
            },
            {
                name: 'water',
                quantity: '10 bottles'
            },
            {
                name: 'wine',
                quantity: '4 bottles'
            },
            {
                name: 'milk',
                quantity: '3 bottles'
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