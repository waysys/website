/**
 * Copyright (c) 2014 Waysys LLC
 *
 * Date: 5/25/14
 * Time: 3:16 PM
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 05-25-2014  W Shaffer  File created
 * 12-15-2016  W Shaffer  Updated to comply with ESLint standard rule
 * 12-24-2016  W Shaffer  Turned globals into class properties
 */

/**
 * Holiday is a class for creating the dates of United States holidays
 */
function Holiday() {
    "use strict";
}

Holiday.prototype = {

    /**
     * Return the date for New Year's Day.
     *
     * @param year the desired year
     * @return (WayDate) the date of New Year's Day for the specified year
     */
    newYearsDay: function (year) {
        "use strict";
        return new WayDate(1, 1, year);
    },

    /**
     * Return the date for Martin Luther King
     *
     * @param year the desired year
     * @return the date of Marting Luther King's
     */
    martinLutherKingsBirthday: function (year) {
        "use strict";
        return this.dateFromPosition(1, year, 1, Holiday.Position.THIRD);
    },

    /**
     * Return the date of Washington's Birthday
     *
     * @param {number} year the year for the date
     */
    washingtonsBirthday: function (year) {
        "use strict";
        return this.dateFromPosition(2, year, 1, Holiday.Position.THIRD);
    },

    /**
     * Return the date of Memorial Day for the year
     *
     * @param {number} year the year of the date
     * @return the date of memorial day
     */
    memorialDay: function (year) {
        "use strict";
        return this.dateFromPosition(5, year, 1, Holiday.Position.LAST);
    },

    /**
     * Return the date of the Independence Day
     *
     * @param {number} year the year of the date
     * @returns (WayDate) the date of Independence Day
     */
    independenceDay: function (year) {
        "use strict";
        return new WayDate(7, 4, year);
    },

    /**
     * Return the date of Labor Day.
     *
     * @param {number} year year of the date
     * @returns the date of Labor Day
     */
    laborDay: function (year) {
        "use strict";
        return this.dateFromPosition(9, year, 1, Holiday.Position.FIRST);
    },

    /**
     * Return the date of Columbus Day.
     *
     * @param {number} year the year of the date
     * @returns the date of Columbus Day
     */
    columbusDay: function (year) {
        "use strict";
        return this.dateFromPosition(10, year, 1, Holiday.Position.SECOND);
    },

    /**
     * Return the date of Veterans Day.
     *
     * @param {number} year the year of the date
     * @return {WayDate} the date of Veterans Day
     */
    veteransDay: function (year) {
        "use strict";
        return new WayDate(11, 11, year);
    },

    /**
     * Return the date of Thanksgiving.
     *
     * @param {number} year the year of the date
     * @return {WayDate} the date of Thanksgiving
     */
    thanksgiving: function (year) {
        "use strict";
        return this.dateFromPosition(11, year, 4, Holiday.Position.FOURTH);
    },

    /**
     * Return the date of Christmas.
     *
     * @param {number} year the year of the date
     * @return {WayDate} the date of Christmas
     */
    christmas: function (year) {
        "use strict";
        return new WayDate(12, 25, year);
    },

    /**
     * Return the date the holiday is observed at the specified index.
     *
     * @param index an index from 0 through 9
     * @param year the desired year of the holiday
     * @return a observed holiday date
     */
    observedHolidays: function (index, year) {
        "use strict";
        var date;
        this.assert(!isNaN(year), "holiday: year must be a number");
        this.assert(year >= 1900,
            "holiday: holiday year must be equal or greater than 1900: " + year);
        switch (index) {
        case 0:
            date = this.observedHoliday(this.newYearsDay(year));
            break;
        case 1:
            date = this.observedHoliday(this.martinLutherKingsBirthday(year));
            break;
        case 2:
            date = this.observedHoliday(this.washingtonsBirthday(year));
            break;
        case 3:
            date = this.easter(year);
            break;
        case 4:
            date = this.observedHoliday(this.memorialDay(year));
            break;
        case 5:
            date = this.observedHoliday(this.independenceDay(year));
            break;
        case 6:
            date = this.observedHoliday(this.laborDay(year));
            break;
        case 7:
            date = this.observedHoliday(this.columbusDay(year));
            break;
        case 8:
            date = this.observedHoliday(this.veteransDay(year));
            break;
        case 9:
            date = this.observedHoliday(this.thanksgiving(year));
            break;
        case 10:
            date = this.observedHoliday(this.christmas(year));
            break;
        default:
            throw new Error("holiday: invalid index: " + index);
        }
        return date;
    },

    /**
     * Return the date of the holiday at the specified index.
     *
     * @param index an index from 0 through 9
     * @param year the desired year of the holiday
     * @return a holiday date
     */
    holidays: function (index, year) {
        "use strict";
        var date;
        this.assert(!isNaN(year), "holiday: year must be a number");
        this.assert(year >= 1900,
            "holiday: holiday year must be equal or greater than 1900: " + year);
        switch (index) {
        case 0:
            date = this.newYearsDay(year);
            break;
        case 1:
            date = this.martinLutherKingsBirthday(year);
            break;
        case 2:
            date = this.washingtonsBirthday(year);
            break;
        case 3:
            date = this.easter(year);
            break;
        case 4:
            date = this.memorialDay(year);
            break;
        case 5:
            date = this.independenceDay(year);
            break;
        case 6:
            date = this.laborDay(year);
            break;
        case 7:
            date = this.columbusDay(year);
            break;
        case 8:
            date = this.veteransDay(year);
            break;
        case 9:
            date = this.thanksgiving(year);
            break;
        case 10:
            date = this.christmas(year);
            break;
        default:
            throw new Error("holiday: invalid index: " + index);
        }
        return date;
    },

    names: [
        "New Year's Day",
        "Birthday of Martin Luther King, Jr.",
        "Washington's Birthday",
        "Easter",
        "Memorial Day",
        "Independence Day",
        "Labor Day",
        "Columbus Day",
        "Veterans Day",
        "Thanksgiving Day",
        "Christmas"
    ],

    /**
     * Return the name of the holiday for a given index.
     *
     * @param {number} index (0 <= index <= 10}
     * @returns {string} the name of the holiday
     */
    getName: function (index) {
        if (isNaN(index)) {
            throw new Error("getName: invalid index: " + index);
        } else if (index < 0) {
            throw new Error("getName: invalid index: " + index);
        } else if (index >= this.names.length) {
            throw new Error("getName: invalid index: " + index);
        }
        return this.names[index];
    },


    /* -------------------------------------------------------------------------
     Supporting Functions
     ------------------------------------------------------------------------- */

    /**
     * Throw an exception if the result is false.
     *
     * @param {Boolean} result the result of a test
     * @param {String} descr the description of the test
     */
    assert: function (result, descr) {
        "use strict";
        if (!result) {
            throw new Error(descr);
        }
    },

    /**
     * Return a date with the specified month and year and day of week. The
     * month position of the date is as specified.
     *
     * @param {number} month
     *            the month of the date (month inset range(1, 12))
     * @param {number} year
     *            the year of the date (year inset range(MINYEAR, MAXYEAR))
     * @param dayOfWeek
     *            the day of the week (dayOfWeek inset range(SUNDAY, SATURDAY))
     * @param {number} monthPosition
     *            the month position (monthPosition inset range(LAST, FOURTH))
     * @return (WayDate) an instance of WayDate with the specified month, year, day of
     *         week and month position
     */
    dateFromPosition: function (month, year, dayOfWeek, monthPosition) {
        "use strict";
        var date;
        /*
         Create initial date
         */
        if (monthPosition === Holiday.Position.LAST) {
            date = new WayDate(month, WayDate.daysInMonth(month, year), year);
        } else {
            date = new WayDate(month, 1, year);
        }
        /*
         date.month = month
         date.year = year

         Obtain nth day from date
         */
        date = this.nthDayFromDate(date, dayOfWeek, monthPosition);
        /**
         * date.dayOfWeekNumber() = dayOfWeek
         *
         */
        return date;
    },

    /**
     * Return the nth day that is on a specified day of the week from a
     * specified date.
     *
     * @param {WayDate} inputDate
     *            the date being considered
     * @param {number} dayOfWeek
     *            the day of the week (dayOfWeek inset range(0, 6))
     * @param {number} monthPosition
     *            the position in the month
     * @return a date in the Nth position
     */
    nthDayFromDate: function (inputDate, dayOfWeek, monthPosition) {
        "use strict";
        var offset, date;
        /*
         Get working date
         */
        if (monthPosition === Holiday.Position.LAST) {
            date = this.dateOnDayOfWeekAfter(inputDate, dayOfWeek);
        } else {
            date = this.dateOnDayOfWeekBefore(inputDate, dayOfWeek);
        }
        offset = this.calculateOffset(monthPosition);
        date = date.add(offset);
        /*
         position of date in month = monthPosition
         */
        return date;
    },

    /**
     * Return the offset used to correct a date
     *
     * @param {number} monthPosition
     *          the position in the month
     * @return (number) the offset used to correct the date
     */
    calculateOffset: function (monthPosition) {
        "use strict";
        var offset = 0;
        switch (monthPosition) {
        case Holiday.Position.FIRST:
            offset = 7;
            break;
        case Holiday.Position.SECOND:
            offset = 14;
            break;
        case Holiday.Position.THIRD:
            offset = 21;
            break;
        case Holiday.Position.FOURTH:
            offset = 28;
            break;
        case Holiday.Position.LAST:
            offset = -7;
            break;
        default:
            throw new Error("nthDayFromDate: illegal position: " +
                monthPosition);
        }
        return offset;
    },

    /**
     * Return a date on a specified day of the week on or before a specified
     * date.
     *
     * @param {WayDate} inputDate
     *            the date being considered
     * @param {number} dayOfWeek
     *            the day of the week (dayOfWeek in set range(0, 6))
     * @returns the date such that date.dayOfWeekNumber() = dayOfWeek and
     *         date.compare(inputDate) <> GREATER
     */
    dateOnDayOfWeekOnOrBefore: function (inputDate, dayOfWeek) {
        "use strict";
        var date1, priorDayOfWeek, date;

        this.assert(inputDate.valid(),
            "dateOnDayOfWeekOnOrBefore: invalid input date");
        this.assert(dayOfWeek >= 0,
            "dateOnDayOfWeekOnOrBefore: invalid dayOfWeek - " + dayOfWeek);
        this.assert(dayOfWeek < 7,
            "dateOnDayOfWeekOnOrBefore: invalid dayOfWeek - " + dayOfWeek);

        date1 = inputDate.add(-dayOfWeek);
        priorDayOfWeek = date1.dayOfWeekNumber();
        date = inputDate.add(-priorDayOfWeek);

        this.assert(date.dayOfWeekNumber() === dayOfWeek,
            "dateOnDayOfWeekOnOrBefore: incorrect day of week" +
            date.dayOfWeekNumber());
        this.assert(date.compare(inputDate) !== WayDate.Compare.GREATER,
            "dateOnDayOfWeekOnOrBefore: date is greater than input");
        return date;
    },

    /**
     * Return the date on a specified day of the week after a specified date
     *
     * @param inputDate
     *            the date being considered
     * @param dayOfWeek
     *            the day of the week (0 <= dayOfWeek < 7)
     * @return the date such that dayOfWeek(date) = dayOfWeek and
     *         date.compare(inputDate) = GREATER
     */
    dateOnDayOfWeekAfter: function (inputDate, dayOfWeek) {
        "use strict";
        var date;
        date = inputDate.add(7);
        date = this.dateOnDayOfWeekOnOrBefore(date, dayOfWeek);
        return date;
    },

    /**
     * Return the date on a specified day of the week before a specified date
     *
     * @param inputDate
     *            the date being considered
     * @param dayOfWeek
     *            the day of the week (dayOfWeek inset range(0, 6))
     * @return the date such that dayOfWeek(date) = dayOfWeek andalso
     *         compare(inputDate, date) = GREATER
     * @exception WayDateException
     *                thrown if the result of adds are out of bounds
     */
    dateOnDayOfWeekBefore: function (inputDate, dayOfWeek) {
        "use strict";
        var date;
        date = inputDate.add(-1);
        date = this.dateOnDayOfWeekOnOrBefore(date, dayOfWeek);
        return date;
    },

    /**
     * Return the date a holiday would be observed if it were a federal holiday.
     *
     * @param date
     *            the holiday being checked
     * @returns the date a holiday will be observed
     */
    observedHoliday: function (date) {
        "use strict";
        var dayOfWeek = date.dayOfWeekNumber();
        switch (dayOfWeek) {
        case 0: // Sunday
            date = date.add(1);
            break;
        case 6: // Saturday
            date = date.add(-1);
            break;
        }
        return date;
    },

    /* -------------------------------------------------------------------------
     Easter
     ------------------------------------------------------------------------- */

    /**
     * Return the date of Easter
     *
     * @param year the desired year
     * @return the date of easter
     */
    easter: function (year) {
        "use strict";
        var date, datePaschalMoon;
        this.assert(!isNaN(year), "easter: year must be a number - " + year);
        this.assert(year >= 1900, "easter: invalid year = " + year);

        datePaschalMoon = this.paschalMoon(year);
        date = this.dateOnDayOfWeekAfter(datePaschalMoon, 0);
        return date;
    },

    /**
     * Return the date of the paschal moon
     *
     * @param year (number) the year of the date
     * @returns (WayDate) the date of the paschal moon for the year
     */
    paschalMoon: function (year) {
        "use strict";
        var date, adjustment;
        date = new WayDate(4, 19, year);
        adjustment = this.adjustedEpach(year);
        date = date.add(-adjustment);
        return date;
    },

    /**
     * Return the adjusted epach
     *
     * @param year (number) the year of interest
     */
    adjustedEpach: function (year) {
        "use strict";
        var shifted, result;
        shifted = this.shiftedEpach(year);
        if ((shifted === 0) ||
            ((shifted === 1) && ((year % 19) > 10))
        ) {
            result = shifted + 1;
        } else {
            result = shifted;
        }
        return result;
    },

    /**
     * Return the shifted epach
     *
     * @param year the year of interest
     * @return the shifted epach
     */
    shiftedEpach: function (year) {
        "use strict";
        var cent, result;
        cent = Math.floor(year / 100);
        result =
            (14 + (11 * (year % 19)) - Math.floor((3 * cent) / 4) +
            Math.floor((5 + 8 * cent) / 25)) % 30;
        return result;
    }

};

/**
 * Enumerated values of the position in the month
 */
Holiday.Position = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    LAST: 5
};
