/**
 * Copyright (c) 2024 Waysys LLC
 *
 * Date: 5/25/14
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 05-25-2014  W Shaffer  File created
 * 12-15-2016  W Shaffer  Updated to comply with ESLint standard rule
 * 12-24-2016  W Shaffer  Turned globals into class properties
 * 06-27-2024  W Shaffer  Converted to ES6 syntax
 */

import { WayDate } from "./WayDate.js";
export { Holiday }

/**
 * Holiday is a class for creating the dates of United States holidays
 */
class Holiday {

    /**
     * Enumerated values of the position in the month
     */
    static Position = {
        FIRST: 1,
        SECOND: 2,
        THIRD: 3,
        FOURTH: 4,
        LAST: 5
    }

    /**
     * Return the date for New Year's Day.
     *
     * @param {number} year the desired year
     * @return (WayDate) the date of New Year's Day for the specified year
     */
    static newYearsDay(year) {
        return new WayDate(1, 1, year);
    }

    /**
     * Return the date for Martin Luther King
     *
     * @param {number} year the desired year
     * @return (WayDate) the date of Marting Luther King's
     */
    static martinLutherKingsBirthday(year) {
        return this.dateFromPosition(1, year, 1, Holiday.Position.THIRD);
    }

    /**
     * Return the date of Washington's Birthday
     *
     * @param {number} year the year for the date
     * @return (WayDate) the date of Washingtons Birthday
     */
    static washingtonsBirthday(year) {
        return this.dateFromPosition(2, year, 1, Holiday.Position.THIRD);
    }

    /**
     * Return the date of Memorial Day for the year
     *
     * @param {number} year the year of the date
     * @return (WayDate) the date of memorial day
     */
    static memorialDay(year) {
        return this.dateFromPosition(5, year, 1, Holiday.Position.LAST);
    }

    /**
     * Return the date of Juneteenth
     * 
     * @param {number} year the year of the date
     * @returns the date of Juneteenth
     */
    static juneteenth(year) {
        return new WayDate(6, 19, year)
    }

    /**
     * Return the date of the Independence Day
     *
     * @param {number} year the year of the date
     * @returns (WayDate) the date of Independence Day
     */
    static independenceDay(year) {
        return new WayDate(7, 4, year);
    }

    /**
     * Return the date of Labor Day.
     *
     * @param {number} year year of the date
     * @returns the date of Labor Day
     */
    static laborDay(year) {
        return this.dateFromPosition(9, year, 1, Holiday.Position.FIRST);
    }

    /**
     * Return the date of Columbus Day.
     *
     * @param {number} year the year of the date
     * @returns the date of Columbus Day
     */
    static columbusDay(year) {
        return this.dateFromPosition(10, year, 1, Holiday.Position.SECOND);
    }

    /**
     * Return the date of Veterans Day.
     *
     * @param {number} year the year of the date
     * @returns {WayDate} the date of Veterans Day
     */
    static veteransDay(year) {
        return new WayDate(11, 11, year);
    }

    /**
     * Return the date of Thanksgiving.
     *
     * @param {number} year the year of the date
     * @returns {WayDate} the date of Thanksgiving
     */
    static thanksgiving(year) {
        return this.dateFromPosition(11, year, 4, Holiday.Position.FOURTH);
    }

    /**
     * Return the date of Christmas.
     *
     * @param {number} year the year of the date
     * @returns {WayDate} the date of Christmas
     */
    static christmas(year) {
        return new WayDate(12, 25, year);
    }

    /**
     * Return an array of holidays.
     *
     * @param {int} year the desired year of the holiday
     * @returns {array} an array of holidays
     */
    static holidays(year) {
        this.assert(!isNaN(year), "holiday: year must be a number");
        this.assert(year >= 1900,
            "holiday: holiday year must be equal or greater than 1900: " + year);

        const hldy = [
            new Holiday(this.newYearsDay(year), "New Year's Day", true),
            new Holiday(this.martinLutherKingsBirthday(year), "Birthday of Martin Luther King, Jr.", false),
            new Holiday(this.washingtonsBirthday(year), "Washington's Birthday", false),
            new Holiday(this.easter(year), "Easter", false),
            new Holiday(this.memorialDay(year), "Memorial Day", false),
            new Holiday(this.juneteenth(year), "Juneteenth", true),
            new Holiday(this.independenceDay(year), "Independence Day", true),
            new Holiday(this.laborDay(year), "Labor Day", false),
            new Holiday(this.columbusDay(year), "Columbus Day", false),
            new Holiday(this.veteransDay(year), "Veterans Day", true),
            new Holiday(this.thanksgiving(year), "Thanksgiving Day", false),
            new Holiday(this.christmas(year), "Christmas", true)
        ]
        return hldy;
    }

    // ------------------------------------------------------------------------
    // Easter
    // ------------------------------------------------------------------------

    /**
     * Return the date of Easter
     *
     * @param year the desired year
     * @returns the date of easter
     */
    static easter(year) {
        this.assert(!isNaN(year), "easter: year must be a number - " + year);
        this.assert(year >= 1900, "easter: invalid year = " + year);

        const datePaschalMoon = this.paschalMoon(year);
        const date = this.dateOnDayOfWeekAfter(datePaschalMoon, 0);
        return date;
    }

    /**
     * Return the date of the paschal moon
     *
     * @param year (number) the year of the date
     * @returns (WayDate) the date of the paschal moon for the year
     */
    static paschalMoon(year) {
        let date = new WayDate(4, 19, year);
        const adjustment = this.adjustedEpach(year);
        date = date.add(-adjustment);
        return date;
    }

    /**
     * Return the adjusted epach
     *
     * @param year (number) the year of interest
     * @returns the adjusted epach
     */
    static adjustedEpach(year) {
        let result;
        const shifted = this.shiftedEpach(year);

        if ((shifted === 0) ||
            ((shifted === 1) && ((year % 19) > 10))
        ) {
            result = shifted + 1;
        } else {
            result = shifted;
        }
        return result;
    }

    /**
     * Return the shifted epach
     *
     * @param year the year of interest
     * @returns the shifted epach
     */
    static shiftedEpach(year) {
        const cent = Math.floor(year / 100);
        const result =
            (14 + (11 * (year % 19)) - Math.floor((3 * cent) / 4) +
                Math.floor((5 + 8 * cent) / 25)) % 30;
        return result;
    }

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------

    /**
     * @param {WayDate} date the date of the holiday
     * @param {string} name name of holiday
     * @param {boolean} fixed true if this is a fixed holiday
     * @constructor
     */
    constructor(date, name, fixed) {
        this.date = date;
        this.nm = name;
        this.fxd = fixed;
    }

    // ------------------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------------------

    /**
     * Return the date of the holiday
     * 
     * @returns {WayDate} the date of the holiday
     */
    get holiday() {
        return this.date
    }

    /**
     * Return the name of the holiday
     * 
     * @returns {string} the name of the holiday
     */
    get name() {
        return this.nm
    }

    /**
     * Return true if the holiday has a fixed date
     * 
     * @returns {boolean} true if the holiday is a fixed date holiday
     */
    get fixed() {
        return this.fxd
    }

    /**
    * Return the date a holiday would be observed if it were a federal holiday.
    *
    * @returns the date a holiday will be observed
    */
    get observedHoliday() {
        const dayOfWeek = this.date.dayOfWeekNumber();
        let date = this.date
        if (this.fixed) {
            switch (dayOfWeek) {
                case 0: // Sunday
                    date = this.date.increment();
                    break;
                case 6: // Saturday
                    date = this.date.decrement();
                    break;
            }
        }
        return date
    }

    /**
     * Return the day of the week on which the holiday is observed.
     * 
     * @returns {string} the abbreviation of the day of the week
     */
    get observedDayOfWeek() {
        return this.observedHoliday.dayOfWeek()
    }

    // ------------------------------------------------------------------------
    // Supporting Functions
    // ------------------------------------------------------------------------

    /**
     * Throw an exception if the result is false.
     *
     * @param {Boolean} result the result of a test
     * @param {String} descr the description of the test
     */
    static assert(result, descr) {
        if (!result) {
            throw new Error(descr);
        }
    }

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
     * @returns (WayDate) an instance of WayDate with the specified month, year, day of
     *         week and month position
     */
    static dateFromPosition(month, year, dayOfWeek, monthPosition) {
        /*
         Create initial date
         */
        let date;
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
    }

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
     * @returns a date in the Nth position
     */
    static nthDayFromDate(inputDate, dayOfWeek, monthPosition) {
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
    }

    /**
     * Return the offset used to correct a date
     *
     * @param {number} monthPosition
     *          the position in the month
     * @returns (number) the offset used to correct the date
     */
    static calculateOffset(monthPosition) {
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
    }

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
    static dateOnDayOfWeekOnOrBefore(inputDate, dayOfWeek) {
        this.assert(inputDate.valid(),
            "dateOnDayOfWeekOnOrBefore: invalid input date");
        this.assert(dayOfWeek >= 0,
            "dateOnDayOfWeekOnOrBefore: invalid dayOfWeek - " + dayOfWeek);
        this.assert(dayOfWeek < 7,
            "dateOnDayOfWeekOnOrBefore: invalid dayOfWeek - " + dayOfWeek);

        const date1 = inputDate.add(-dayOfWeek);
        const priorDayOfWeek = date1.dayOfWeekNumber();
        const date = inputDate.add(-priorDayOfWeek);

        this.assert(date.dayOfWeekNumber() === dayOfWeek,
            "dateOnDayOfWeekOnOrBefore: incorrect day of week" +
            date.dayOfWeekNumber());
        this.assert(date.compare(inputDate) !== WayDate.Compare.GREATER,
            "dateOnDayOfWeekOnOrBefore: date is greater than input");
        return date;
    }

    /**
     * Return the date on a specified day of the week after a specified date
     *
     * @param inputDate
     *            the date being considered
     * @param dayOfWeek
     *            the day of the week (0 <= dayOfWeek < 7)
     * @returns the date such that dayOfWeek(date) = dayOfWeek and
     *         date.compare(inputDate) = GREATER
     */
    static dateOnDayOfWeekAfter(inputDate, dayOfWeek) {
        let date = inputDate.add(7);
        date = this.dateOnDayOfWeekOnOrBefore(date, dayOfWeek);
        return date;
    }

    /**
     * Return the date on a specified day of the week before a specified date
     *
     * @param inputDate
     *            the date being considered
     * @param dayOfWeek
     *            the day of the week (dayOfWeek inset range(0, 6))
     * @returns the date such that dayOfWeek(date) = dayOfWeek andalso
     *         compare(inputDate, date) = GREATER
     * @exception WayDateException
     *                thrown if the result of adds are out of bounds
     */
    static dateOnDayOfWeekBefore(inputDate, dayOfWeek) {
        let date = inputDate.add(-1);
        date = this.dateOnDayOfWeekOnOrBefore(date, dayOfWeek);
        return date;
    }

    /**
     * Return the date a holiday would be observed if it were a federal holiday.
     *
     * @param date
     *            the holiday being checked
     * @returns the date a holiday will be observed
     */
    static observedHoliday(date) {
        let dayOfWeek = date.dayOfWeekNumber();
        switch (dayOfWeek) {
            case 0: // Sunday
                date = date.add(1);
                break;
            case 6: // Saturday
                date = date.add(-1);
                break;
        }
        return date;
    }
}


