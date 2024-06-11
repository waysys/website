/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 */

/* globals angular */
angular.
    module("datediff", []).
    controller("datediffCtrl", DateDiffCntrl);

/**
 * This is the AngularJS controller for the datediff.html screen.
 *
 * @param $scope the AngularJS scope
 * @constructor
 */
function DateDiffCntrl($scope) {

    $scope.date1 = WayDate.today();
    $scope.year1 = $scope.date1.year;
    $scope.month1 = $scope.date1.month;
    $scope.day1 = $scope.date1.day;
    $scope.date2 = WayDate.today();
    $scope.year2 = $scope.date2.year;
    $scope.month2 = $scope.date2.month;
    $scope.day2 = $scope.date2.day;
    $scope.days = 0;
    $scope.error = "";
    $scope.twoDigitRegex = "\\d{1,2}";
    $scope.fourDigitRegex = "\\d{4}";

    /**
     * This is the event handler for the onClick event on the calculate button.
     */
    $scope.entry = function () {
        $scope.error = "";

        try {
            var date1 = $scope.validate($scope.month1, $scope.day1, $scope.year1, "first date");
            var date2 = $scope.validate($scope.month2, $scope.day2, $scope.year2, "minus date");
            $scope.days = date1.difference(date2);
        } catch (e) {
            $scope.error = e.message;
        }
    };

    /**
     * Validate the three components of a date.
     *
     * @param {number} month the month of the date
     * @param {number} day the day of the date
     * @param {number} year the year of the date
     * @param {string} dateNumber "first date" if this is the first date, "minus date" if it is the second
     * @returns {WayDate} the date with the inputs as components, if the components are valid
     */
    $scope.validate = function(month, day, year, dateNumber) {
        if (typeof month !== "number" ) {
            throw new Error("Please enter a valid month between 1 and 12 for " + dateNumber);
        }
        if (typeof day !== "number" ) {
            throw new Error("Please enter a valid day between 1 and 31 for " + dateNumber);
        }
        if (typeof year !== "number" ) {
            throw new Error("Please enter a valid year between 1601 and 3999 for " + dateNumber);
        }
        return new WayDate(month, day, year);
    };
}
