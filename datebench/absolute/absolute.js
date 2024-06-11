/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 */

/* globals angular */

angular.
    module("absolute", []).
    controller("absoluteCtrl", AbsoluteCtrl);

/**
 * This function is an AngularJS controller for the absolute.html screen.
 *
 * @param $scope the AngularJS scope
 * @constructor
 */
function AbsoluteCtrl($scope) {

    /**
     * Define the model for this module.
     */
    $scope.resultDate = WayDate.today();
    $scope.month1 = $scope.resultDate.month;
    $scope.day1 = $scope.resultDate.day;
    $scope.year1 = $scope.resultDate.year;
    $scope.error1 = "";
    $scope.month2 = $scope.resultDate.month;
    $scope.day2 = $scope.resultDate.day;
    $scope.year2 = $scope.resultDate.year;
    $scope.error2 = "";
    $scope.absolute2 = $scope.resultDate.valueOf();
    $scope.twoDigitRegex = "\\d{1,2}";
    $scope.fourDigitRegex = "\\d{4}";
    $scope.numRegex = "[+,-]?\\d{1,6}";
    $scope.result = $scope.resultDate.valueOf();

    /**
     * Perform the calculation of the absolute date from month, day, and year.
     */
    $scope.entry1 = function () {
        $scope.error1 = "";
        if (typeof $scope.month1 !== "number") {
            $scope.error1 = "Please enter a valid month between 1 and 12";
        } else if (typeof $scope.day1 !== "number") {
            $scope.error1 = "Please enter a valid day between 1 and 31";
        } else if (typeof $scope.year1 !== "number") {
            $scope.error1 = "Please enter a valid year between 1601 and 3999";
        } else {
            try {
                var date = new WayDate($scope.month1, $scope.day1, $scope.year1);
                $scope.result = date.valueOf();
            } catch (e) {
                $scope.error1 = e.message;
            }
        }
    };

    /**
     * Perform the calculation of month, day, and year from the absolute date.
     */
    $scope.entry2 = function () {
        $scope.error2 = "";
        if (typeof $scope.absolute2 !== "number") {
            $scope.error2 = "Please enter a valid absolute date between 1 and 876216";
        } else {
            try {
                var datelist = WayDate.monthDayYearFromAbsolute($scope.absolute2);
                $scope.month2 = datelist[0];
                $scope.day2 = datelist[1];
                $scope.year2 = datelist[2];
            } catch (e) {
                $scope.error2 = e.message;
            }
        }
    };
}
