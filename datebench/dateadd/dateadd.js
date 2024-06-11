/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 */

/* globals angular */
angular.
    module("dateadd", []).
    controller("dateAddCtrl", DateAddCntrl);

/**
 * This function is an AngularJS controller for the dateadd.html screen
 *
 * @param $scope the AngularJS scope
 * @constructor
 */
function DateAddCntrl($scope) {

    /**
     * Define the model for this module.
     */
    $scope.resultDate = WayDate.today();
    $scope.month = $scope.resultDate.month;
    $scope.day = $scope.resultDate.day;
    $scope.year = $scope.resultDate.year;
    $scope.days = 0;
    $scope.error = "";
    $scope.twoDigitRegex = "\\d{1,2}";
    $scope.fourDigitRegex = "\\d{4}";
    $scope.numRegex = "[+,-]?\\d{1,7}";

    $scope.entry = function entry() {
        $scope.error = "";
        if (typeof $scope.month !== "number") {
            $scope.error = "Please enter a valid month between 1 and 12";
        } else if (typeof $scope.day !== "number") {
            $scope.error = "Please enter a valid day between 1 and 31";
        } else if (typeof $scope.year !== "number") {
            $scope.error = "Please enter a valid year between 1601 and 3999";
        } else if (typeof $scope.days !== "number") {
            $scope.error = "Please enter a valid number for the days";
        } else {
            try {
                var date = new WayDate($scope.month, $scope.day, $scope.year);
                $scope.resultDate = date.add($scope.days);
            } catch (e) {
                $scope.error = e.message;
            }
        }
    };

}
