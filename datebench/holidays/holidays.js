/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 30-Dec-2016 W Shaffer  File created
 */

/* globals angular Holiday*/
angular.
    module("holidays", []).
    controller("holidaysCtrl", HolidayCntrl);

/**
 * This is the controller for the holidays.html page.
 *
 * @param $scope the AngularJS scope variable
 */
function HolidayCntrl($scope) {

    /*
    Initialize the model
     */
    $scope.year = WayDate.today().year;
    $scope.error = "";
    $scope.holidays = [];
    $scope.yearRegex = "\\d{4}";

    $scope.populateTable = function (year) {
        var holiday = new Holiday();
        var index;
        for (index = 0; index < 11; index++) {
            $scope.holidays[index] = {
                name : holiday.getName(index),
                date : holiday.holidays(index, year).toString(),
                observedDate : holiday.observedHolidays(index, year).toString(),
                dayOfWeek : holiday.observedHolidays(index, year).dayOfWeek()
            };
        }
    };

    $scope.entry = function () {
        var message = "Please enter a valid 4 digit year between 1900 and 2399";
        $scope.error = "";
        if (typeof $scope.year !== "number") {
            $scope.error = message;
        } else {
            var yearAsNum = Number($scope.year);
            if (isNaN(yearAsNum)) {
                $scope.error = message;
            } else if (yearAsNum < 1900) {
                $scope.error = message;
            } else if (yearAsNum >= 2400) {
                $scope.error = message;
            } else {
                try {
                    $scope.populateTable(yearAsNum);
                } catch (err) {
                    $scope.error = err.message;
                }
            }
        }
    };
    $scope.populateTable($scope.year);
}
