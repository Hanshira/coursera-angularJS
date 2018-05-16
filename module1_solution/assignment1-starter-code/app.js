(function () {
    "use strict"

    angular.module("LunchCheck", [])

        .controller("LunchCheckController", LunchCheckController)

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchList = "";
        $scope.message = "";

        $scope.checkList = function () {
            let lunchArray = $scope.lunchList.split(",");
            let emplyElement = " ";
            let index = 0;
            while (index != -1) {
                lunchArray.splice(lunchArray.indexOf(emplyElement, index), 1)
                index = lunchArray.indexOf(emplyElement);
            }
            let lunchNumber = lunchArray.length;
            if (lunchNumber === 1 && lunchArray[0] === "") $scope.message = "Please enter data first"
            else if (lunchNumber <= 3) $scope.message = "Enjoy!";
            else $scope.message = "Too much!";

        }
    }






})()