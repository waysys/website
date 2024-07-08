/*
 * Copyright (c) 2014, 2016, 2024 William Shaffer
 *
 * Date: 09-Feb-2014
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 09-Feb-2014 W Shaffer  File created
 * 16-Dec-2016 W Shaffer  ESLint errors corrected
 * 24-Dec-2016 W Shaffer  Global methods turned into class methods
 * 24-Jun-2024 W Shaffer  Converted to class notation
 */

export { WayDate }

/**
 * WayDate is a class for performing date calculation.
 * 
 */
class WayDate {

    // ------------------------------------------------------------------------
    // Static Properties
    // ------------------------------------------------------------------------

    static MINIMUM_YEAR = 1601;
    static MAXIMUM_YEAR = 3999;
    static MAXIMUM_ABSOLUTE_DATE = 876216;

    static MinDate = new WayDate(1, 1, this.MINIMUM_YEAR)
    static MaxDate = new WayDate(12, 31, this.MAXIMUM_YEAR)

    static Compare = {
        LESS: -1,
        EQUAL: 0,
        GREATER: 1
    }

    // ------------------------------------------------------------------------
    // Validation Methods
    // ------------------------------------------------------------------------

    /**
     * Return true if the month is a valid month, that is:
     * 1 <= month <= 12
     * 
     * @param {number} month the month being tested
     * @returns {boolean} true if the month is valid
     */
    static isMonth(month) {
        let result = true;
        if (typeof month !== "number") {
            result = false;
        } else {
            result = (1 <= month) && (month <= 12);
        }
        return result;
    }

    /**
     * Return true if the specified year is valid, that is:
     * MINIMUM_YEAR <= year <= MAXIMIM_YEAR
     * 
     * @parm (number) year the year being tested
     * @returns (boolean) true if year is valid
     */
    static isYear(year) {
        let result = true;
        if (typeof year !== "number") {
            result = false;
        } else {
            result = (WayDate.MINIMUM_YEAR <= year) && (year <= WayDate.MAXIMUM_YEAR)
        }
        return result
    }

    /**
     * Return true if the dayOfWeek is a valid day of the week, that is:
     * 0 <= dayOfWeek <= 6
     * 
     * @param {number} dayOfWeek the day of the week.  Sunday is 0.
     * @returns {boolean} true if the day of the week is valid
     */
    static isDayOfWeek(dayOfWeek) {
        let result = true;
        if (typeof dayOfWeek !== "number") {
            result = false;
        } else {
            result = (0 <= dayOfWeek) && (dayOfWeek <= 6)
        }
        return result
    }

    /**
     * Return true if the dayOfYear is a valid day of the year, that is:
     * if year is a leap year, 1 <= dayOfYear <= 366
     * if year is not a leap year, 1 <= dayOfYear < 365
     * 
     * @param (number) dayOfYear the day of year being tested
     * @param (number) year the year being tested
     * @returns (boolean) true if the day of year is valid
     */
    static isDayOfYear(dayOfYear, year) {
        let result = true;
        if (typeof dayOfYear !== "number") {
            result = false;
        } else if (!this.isYear(year)) {
            result = false;
        } else {
            result = (1 <= dayOfYear) && (dayOfYear <= this.daysInYear(year))
        }
        return result;
    }

    /**
     * Return true if the absolute date is a valid absolute date, that is:
     * 1 <= abDate <= MAXIMUM_ABSOLUTE_DATE
     */
    static isAboluteDate(abDate) {
        let result = false;
        if (typeof abDate !== "number") {
            result = false
        } else if ((abDate >= 1) && (abDate <= this.MAXIMUM_ABSOLUTE_DATE)) {
            result = true
        }
        return result
    }

    /**
     * Return true if the combination of month, day, year is
     * a valid date.
     *
     * @param {number} month the month of the year 1 <= month <= 12
     * @param {number} day the day of the month 1 <= day <= 31
     * @param {number} year the year of the date 1600 < year < 4000
     */
    static isValidDate(month, day, year) {
        let result = true;
        let numberDaysInMonth;

        if (!this.isMonth(month)) {
            result = false;
        } else if (!this.isYear(year)) {
            result = false;
        } else if (typeof day !== "number") {
            result = false;
        } else if (isNaN(day)) {
            result = false;
        }

        if (result) {
            numberDaysInMonth = WayDate.daysInMonth(month, year);
            if (day < 1) {
                result = false;
            } else if (day > numberDaysInMonth) {
                result = false;
            }
        }
        return result;
    }

    // ------------------------------------------------------------------------
    // Abbreviation Methods
    // ------------------------------------------------------------------------

    /**
      * Return the string abbreviation for a month
      *
      * @param {number} month
      * @returns {string} the three letter abbreviation for the month
      */
    static monthAbbrev(month) {
        const abbrevs = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        ];

        this.assert(this.isMonth(month), "monthAbbrev: invalid month: " + month)
        return abbrevs[month - 1];
    }

    /**
     * Return the abbreviation of the day of the week.
     *
     * @param {number} dayOfWeek the day of the week - Sunday = 0
     * @returns {String} the day of the week
     */
    static dayOfWeekAbbrev(dayOfWeek) {
        this.assert(this.isDayOfWeek(dayOfWeek), "Invalid day of week: " + dayOfWeek)

        const abbrevs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return abbrevs[dayOfWeek];
    }

    // ------------------------------------------------------------------------
    // Factory Methods
    // ------------------------------------------------------------------------

    /**
     * Return a date, given a year and day of year.
     *
     * @param {number} dayOfYear the day of the year
     * @param {number} year
     * @returns {WayDate} a date
     */
    static dateFromDayOfYear(dayOfYear, year) {
        this.assert(this.isDayOfYear(dayOfYear, year),
            "Invalid day of year or year: " + dayOfYear + " " + year);

        const monthDay = WayDate.monthDayFromDayOfYear(dayOfYear, year);
        return new WayDate(monthDay[0], monthDay[1], year);
    }

    /**
     * Return today's date
     *
     * @returns {WayDate} a date with the current month, day, and year
     */
    static today() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return new WayDate(month, day, year);
    }

    /**
     * Return a WayDate with the month, day, and year based on an absolute
     * date.
     *
     * @param {number} abDate an absolute date
     * @returns {WayDate} an array with month, day, year
     */
    static dateFromAbsolute(abDate) {
        this.assert(this.isAboluteDate(abDate), "Invalid absolute date: " + abDate)
 
        const year = WayDate.yearFromAbsolute(abDate);
        const dayOfYear = abDate - WayDate.daysInPastYears(year - 1);
        const monthDay = WayDate.monthDayFromDayOfYear(dayOfYear, year);
        return new WayDate(monthDay[0], monthDay[1], year);
    }

    // ------------------------------------------------------------------------
    // Static Methods
    // ------------------------------------------------------------------------

    /**
     * Return true if the year is a leap year.
     *
     * @param {number} year the year being tested
     * @returns {Boolean} true if year is a leap year
     */
    static isLeapYear(year) {
        let result = false;

        this.assert(this.isYear(year), "Invalid year: " + year)

        if (year % 400 === 0) {
            result = true;
        } else if (year % 100 === 0) {
            result = false;
        } else if (year % 4 === 0) {
            result = true;
        }
        return result;
    }

    /**
     * Return the number of days in the month.
     *
     * @param {number} month
     * @param {number} year
     * @returns {number} the number of days in the month
     */
    static daysInMonth(month, year) {
        let numberDaysInMonth;

        this.assert(this.isMonth(month), "Invalid month: " + month);
        this.assert(this.isYear(year), "Invalid year: " + year);

        const daysInLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const daysInRegYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (WayDate.isLeapYear(year)) {
            numberDaysInMonth = daysInLeapYear[month - 1];
        } else {
            numberDaysInMonth = daysInRegYear[month - 1];
        }
        return numberDaysInMonth;
    }

    /**
     * Return the number of days in a year.
     *
     * @param {number} year the year being specified
     * @return {number} number of days in the year
     */
    static daysInYear(year) {
        let days;

        this.assert(this.isYear(year), "Invalid year: " + year)

        if (WayDate.isLeapYear(year)) {
            days = 366;
        } else {
            days = 365;
        }
        return days;
    }

    /**
     * Return the days in the specified year and prior years
     *
     * @param {number} year the specified year (1600 <= year <= MAXIMUM_YEAR
     * @returns {number} the days in prior years
     *  (0 <= days <= MAXIMUM_ABSOLUTE_DATE)
     */
    static daysInPastYears(year) {
        const y = year - 1600;
        let days = 0;

        // Note: year could be 1600, which is not a valid year.
        if (year > WayDate.MAXIMUM_YEAR) {
            throw new Error("Invalid value for year: " + year);
        }
        if (y < 0) {
            throw new Error("Invalid value for year: " + year);
        }
        if (y === 0) {
            days = 0;
        } else {
            days = 365 * y // days in prior years
                + Math.floor(y / 4) // plus julian leap days in prior years
                - Math.floor(y / 100) // minus prior century years
                + Math.floor(y / 400); // plus years divisible by 400
        }
        return days;
    }

    /**
     * Return the day of the year.  1-Jan is day 1.
     *
     * @param {number} month
     * @param {number} day
     * @param {number} year
     * @returns {number} day of year.  (1 <= day <= daysInYear(year)
     *
     */
    static dayOfYear(month, day, year) {

        this.assert(this.isValidDate(month, day, year),
            "Invalid month, day, year: " + month + " " + day + " " + year)

        let dayInYear = Math.floor((367 * month - 362) / 12) + day;
        if (WayDate.isLeapYear(year) && (month > 2)) {
            dayInYear -= 1;
        } else if (!WayDate.isLeapYear(year) && (month > 2)) {
            dayInYear -= 2;
        }
        return dayInYear;
    }

    /**
     * Return the year of the absolute date
     *
     * @param {number} abDate an absolute date (1 <= abDate <= MAXIMUM_ABSOLUTE_DATE)
     * @returns {number} year associated with the absolute date
     */
    static yearFromAbsolute(abDate) {
        let year;
        const d0 = abDate - 1,
            n400 = Math.floor(d0 / 146097), // Number of days in a 400 year cycle:
            d1 = d0 % 146097, // 400*365 + 100 - 3
            n100 = Math.floor(d1 / 36524),  // Number of days in 100 year cycle:
            d2 = d1 % 36524,  // 365*100 + 25 - 1
            n4 = Math.floor(d2 / 1461),     // Number of days in 4 year cycle:
            d3 = d2 % 1461,   // 365*4 + 1
            n1 = Math.floor(d3 / 365);      // Number of days in 1 year:
        //
        // If n100 = 4 or n1 = 4, then the date is 31-Dec of the leap
        // year so we add one less year to get the absolute year
        //
        if ((n100 === 4) || (n1 === 4)) {
            year = 400 * n400 + 100 * n100 + 4 * n4 + n1 + 1600;
        } else {
            year = 400 * n400 + 100 * n100 + 4 * n4 + n1 + 1601;
        }
        return year;
    }

    /**
     * Return an array of two elements with the month and day derived from
     * an absolute date.
     *
     * @param {number} dayOfYear day of year (1 <= dayOfYear <= daysInYear(year)
     * @param {number} year (MINIMUM_YEAR <= year <= MAXIMUM_YEAR)
     * @returns {Array} the month and day of the year
     */
    static monthDayFromDayOfYear(dayOfYear, year) {
        if (year < WayDate.MINIMUM_YEAR) {
            throw new Error("Year is less than minimum year: " + year);
        }
        if (year > WayDate.MAXIMUM_YEAR) {
            throw new Error("Year is greater than maximum year: " + year);
        }
        if (dayOfYear < 1) {
            throw new Error("Day of year is less than 1: " + dayOfYear);
        }
        if (dayOfYear > WayDate.daysInYear(year)) {
            throw new Error("DayOfYear is larger than days in year: " + dayOfYear);
        }
        let day = 1,
            month = 1,
            diff = dayOfYear - 1;

        while (diff > 0) {
            if (diff >= WayDate.daysInMonth(month, year)) {
                diff -= WayDate.daysInMonth(month, year);
                month += 1;
            } else {
                day = diff + 1;
                diff = 0;
            }
        }
        return [month, day];
    }

    /* -------------------------------------------------------------------------
     Supporting Functions
     ------------------------------------------------------------------------- */

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

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------

    /** 
     * @param {number} month the number of the month 1 <= month <= 12
     * @param {number} year  the year of the date 1600 < year < 4000
     * @param {number} day the day of the month
     * @constructor
     */
    constructor(month, day, year) {
        if (!WayDate.isValidDate(month, day, year)) {
            throw new Error("Invalid date: " + month + "/" + day + "/" + year);
        }
        this.month = month;
        this.day = day;
        this.year = year;
    }

    // ------------------------------------------------------------------------
    // Instance Methods
    // ------------------------------------------------------------------------

    /**
     * Return true if date is the same date as this.
     *
     * @param {WayDate} date a date
     * @return {Boolean} date = this
     */
    equals(date) {
        if (!(date instanceof WayDate)) {
            throw new Error("equals: date is not an instance of WayDate");
        }
        let result = true;
        if (date.month !== this.month) {
            result = false;
        }
        if (date.day !== this.day) {
            result = false;
        }
        if (date.year !== this.year) {
            result = false;
        }
        return result;
    }

    /**
     * Return true if the date is valid.
     *
     * @returns {Boolean} true if date is valid
     */
    valid() {
        return WayDate.isValidDate(this.month, this.day, this.year);
    }

    /**
     * Return a string representation of the date in format: DD-MON-YYYY
     *
     * @returns {String} the date represented as a string
     */
    toString() {
        let result;
        let day = this.day.toString();
        if (day.length === 1) {
            day = "0" + day;
        }
        result = day + "-" + this.monthAbbrev(this.month) + "-" +
            this.year.toString();
        return result;
    }

    /**
     * Return the number of days since 31-Dec-1600.
     *
     * @returns {number} the absolute date
     */
    valueOf() {
        return WayDate.dayOfYear(this.month, this.day, this.year) +
            WayDate.daysInPastYears(this.year - 1);
    }

    /**
     * Return the day of the year
     *
     * @returns {number} the day of the year
     *   (1 <= dayOfYear <= daysInYear(year))
     */
    dayYear() {
        return WayDate.dayOfYear(this.month, this.day, this.year);
    }

    /**
     * Return the number of the day of the week.  (0 <= number <= 6)
     *
     * @returns {number} the number of the day
     */
    dayOfWeekNumber() {
        const abDate = this.valueOf();
        return abDate % 7;  // works because 01-Dec-1601 is Monday
    }

    /**
     * Return the abbreviation for the day of the week of the date
     *
     * @returns {string} the day of the week
     */
    dayOfWeek() {
        return WayDate.dayOfWeekAbbrev(this.dayOfWeekNumber());
    }

    /**
     * Return the abbreviation for the month
     * 
     * @returns {string} the abbreviation for the month
     */
    monthAbbrev() {
        return WayDate.monthAbbrev(this.month)
    }

    /**
     * Return a date on day after the current date.
     * 
     * @returns {WayDate} a new date one day after current date
     */
    increment() {
        WayDate.assert(!this.equals(WayDate.MaxDate),
            "Unable to increment maximum date")

        let date 
        if (this.day < this.lastDayOfMonth().day) {
            date = new WayDate(this.month, this.day + 1, this.year)
        } else if (this.month == 12) {
            date = new WayDate(1, 1, this.year + 1)
        } else {
            date = new WayDate(this.month + 1, 1, this.year)
        }
        return date
    }

    /**
     * Return a date the day before the current date.
     * 
     * @returns (WayDate) the day before the current date
     */
    decrement() {
        WayDate.assert(!this.equals(WayDate.MinDate), 
            "Unable to decrement minimum date")

        let date
        if (this.day > 1) {
            date = new WayDate(this.month, this.day - 1, this.year)
        } else if (this.month == 1) {
            date = new WayDate(12, 31, this.year - 1)
        } else {
            date = new WayDate(this.month - 1, WayDate.daysInMonth(this.month - 1, this.year), this.year)
        }
        return date
    }

    /**
     * Return a date by adding a value to the existing date.  The value
     * can be positive or negative.
     *
     * @param {number} value the value to add to the date
     * @returns {WayDate} the new date
     */
    add(value) {
        if ((typeof value !== "number") || isNaN(value)) {
            throw new Error("add: value to add must be a number, not: " + value);
        }
        value = Math.floor(value);
        let abDate = this.valueOf();
        abDate += value;
        if (abDate < 1) {
            throw new Error("Value is too negative: " + value);
        }
        if (abDate > WayDate.MAXIMUM_ABSOLUTE_DATE) {
            throw new Error("Value is too large: " + value);
        }
        const date = WayDate.dateFromAbsolute(abDate);
        return date;
    }

    /**
     * Return the number of days between this date and another date
     *
     * @param {WayDate} anotherDate another date
     * @returns {number} the difference between the dates
     */
    difference(anotherDate) {
        if (!anotherDate.valid()) {
            throw new Error("Invalid date");
        }
        return this.valueOf() - anotherDate.valueOf();
    }

    /**
     * Return true if the year is a leap year
     *
     * @returns {Boolean} true if the year is a leap year
     */
    leapYear() {
        return WayDate.isLeapYear(this.year);
    }

    /**
     * Return the first day of the month for a date
     *
     * @returns {WayDate} the first day of the month
     */
    firstDayOfMonth() {
        return new WayDate(this.month, 1, this.year);
    }

    /**
     * Return the last day of the month
     */
    lastDayOfMonth() {
        return new WayDate(this.month, 
            WayDate.daysInMonth(this.month, this.year), 
            this.year)
    }

    /**
     * Return LESS if this date is LESS than another date.
     * Return EQUAL if two dates are equal
     * Return GREATER if this date is GREATER than another date
     *
     * @param {WayDate} anotherDate another date
     * @returns LESS, EQUAL, GREATER
     */
    compare(anotherDate) {
        let result;
        const me = this.valueOf();
        const them = anotherDate.valueOf();

        if (me < them) {
            result = WayDate.Compare.LESS;
        } else if (me > them) {
            result = WayDate.Compare.GREATER;
        } else {
            result = WayDate.Compare.EQUAL;
        }
        return result;
    }

    /**
     * Return true if this date is after another date (and not equal to another date).
     * 
     * @param {WayDate} anotherDate the other date
     * @returns {boolean} true if this date is after the other date
     */
    after(anotherDate) {
        const result = this.compare(anotherDate); 
        return result == WayDate.Compare.GREATER;
    }

    /**
     * Return true if this date is before another date (and not equal to another date).
     * 
     * @param {WayDate} anotherDate the other date
     * @returns {boolean} true if this date is before the other date
     */
    before(anotherDate) {
        const result = this.compare(anotherDate);
        return result == WayDate.Compare.LESS;
    }
}
