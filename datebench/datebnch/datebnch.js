/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 25-Dec-2016 W Shaffer  File created
 */

/* globals angular */
angular.
    module("datebnch", []).
    controller("datebnchCtrl", DateBnchCntrl);

/**
 * This is the AngularJS controller for the datebnch.html screen.
 *
 * @param $scope the AngularJS scope
 * @constructor
 */
function DateBnchCntrl($scope) {

    $scope.thisDate = WayDate.today();
    $scope.day = $scope.thisDate.day;
    $scope.month = $scope.thisDate.month;
    $scope.year = $scope.thisDate.year;
    $scope.error = "";
    $scope.twoDigitRegex = "\\d{1,2}";
    $scope.fourDigitRegex = "\\d{4}";

    /**
     * Return the day of the month for a given position in the calendar.  The calendar is a two dimensional table
     * with 7 columns for each day in the week, and 6 rows.  (Not all rows are used for all months.)
     *
     * @param row {number} the row in the calendar (0 <= row < 6)
     * @param dayOfWeek {number} the day of the week as a number (0 <= dayOfWeek < 7)
     * @returns {string} a string with the day of month where appropriate.
     */
    $scope.dayInCalendar = function (row, dayOfWeek) {
        var firstDayInMonth = $scope.thisDate.firstDayOfMonth().dayOfWeekNumber();
        var dayInMonth = 7 * row + dayOfWeek - firstDayInMonth;
        var month = $scope.thisDate.month;
        var year = $scope.thisDate.year;
        var result = "";
        if (dayInMonth < 0) {
            result = "___";
        } else if (dayInMonth >= WayDate.daysInMonth(month, year) ) {
            result = "___";
        } else {
            result = "" + (dayInMonth + 1);
        }
        return result;
    };

    /**
     * OnClick event handler for Calculate button on datebnch.html screen.
     */
    $scope.entry = function () {
        $scope.error = "";
        if (typeof $scope.month !== "number") {
            $scope.error = "Please enter a valid month between 1 and 12";
        } else if (typeof $scope.day !== "number") {
            $scope.error = "Please enter a valid day between 1 and 31";
        } else if (typeof $scope.year !== "number") {
            $scope.error = "Please enter a valid year between 1601 and 3999";
        } else {
            try {
                $scope.thisDate = new WayDate($scope.month, $scope.day, $scope.year);
            } catch (e) {
                $scope.error = e.message;
            }
        }
    };

}