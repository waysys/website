/*
 * Copyright (c) 2014, 2016 Waysys LLC
 *
 * Date: 2/9/14
 * Time: 5:42 PM
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 09-Feb-2014 W Shaffer  File created
 * 16-Dec-2016 W Shaffer  ESLint errors corrected
 * 24-Dec-2016 W Shaffer  Global methods turned into class methods
 */

/**
 * WayDate is a class for performing date calculation.
 *
 * @param {number} month the number of the month 1 <= month <= 12
 * @param {number} year  the year of the date 1600 < year < 4000
 * @param {number} day the day of the year
 * @constructor
 */
function WayDate(month, day, year) {
    "use strict";
    if (!WayDate.isValidDate(month, day, year)) {
        throw new Error("WayDate: invalid date: " +
            month + " " + day + " " + year);
    }
    this.month = month;
    this.day = day;
    this.year = year;
}

WayDate.prototype = {
    /**
     * Return true if date is the same date as this.
     *
     * @param {WayDate} date a date
     * @return {Boolean} date = this
     */
    equals: function (date) {
        "use strict";
        if (!(date instanceof WayDate)) {
            throw new Error("equals: date is not an instance of WayDate");
        }
        var result = true;
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
    },

    /**
     * Return true if the date is valid.
     *
     * @returns {Boolean} true if date is valid
     */
    valid: function () {
        "use strict";
        return WayDate.isValidDate(this.month, this.day, this.year);
    },

    /**
     * Return the string abbreviation for a month
     *
     * @param {number} month
     * @returns {String} the three letter abbreviation for the month
     */
    monthAbbrev: function (month) {
        "use strict";
        var abbrevs = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec"
        ];
        if (month < 1) {
            throw new Error("monthAbbrev: month must be greater than 1: " +
                month);
        } else if (month > 12) {
            throw new Error("monthAbbrev: must be less than or equal to 12: " +
                month);
        }
        return abbrevs[month - 1];
    },

    /**
     * Return the abbreviation of the day of the week.
     *
     * @param {number} day the day of the week - Sunday = 0
     * @returns {String} the day of the week
     */
    dayOfWeekAbbrev: function (day) {
        "use strict";
        if (day < 0) {
            throw new Error("Invalid day of week: " + day);
        }
        if (day > 7) {
            throw new Error("Invalid day of week: " + day);
        }
        var abbrevs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return abbrevs[day];
    },

    /**
     * Return a string representation of the date in format: DD-MON-YYYY
     *
     * @returns {String} the date represented as a string
     */
    toString: function () {
        "use strict";
        var result,
            day = this.day.toString();
        if (day.length === 1) {
            day = "0" + day;
        }
        result = day + "-" + this.monthAbbrev(this.month) + "-" +
            this.year.toString();
        return result;
    },

    /**
     * Return the number of days since 31-Jan-1600.
     *
     * @returns {number} the absolute date
     */
    valueOf: function () {
        "use strict";
        return WayDate.dayOfYear(this.month, this.day, this.year) +
            WayDate.daysInPastYears(this.year - 1);
    },

    /**
     * Return the day of the year
     *
     * @returns {number} the day of the year
     *   (1 <= dayOfYear <= daysInYear(year))
     */
    dayYear: function () {
        "use strict";
        return WayDate.dayOfYear(this.month, this.day, this.year);
    },

    /**
     * Return the number of the day of the week.  (0 <= number <= 6)
     *
     * @returns {number} the number of the day
     */
    dayOfWeekNumber: function () {
        "use strict";
        var abDate = this.valueOf();
        return abDate % 7;  // works because 01-Dec-1601 is Monday
    },

    /**
     * Return the abbreviation for the day of the week of the date
     *
     * @returns {String} the day of the week
     */
    dayOfWeek: function () {
        "use strict";
        return this.dayOfWeekAbbrev(this.dayOfWeekNumber());
    },

    /**
     * Return a date by adding a value the existing date.  The value
     * can be positive or negative.
     *
     * @param {number} value the value to add to the date
     * @returns {WayDate} the new date
     */
    add: function (value) {
        "use strict";
        if ((typeof value !== "number") || isNaN(value)) {
            throw new Error("add: value to add must be a number, not: " + value);
        }
        value = Math.floor(value);
        var abDate = this.valueOf(),
            monthDayYear;
        abDate += value;
        if (abDate < 1) {
            throw new Error("Value is too negative: " + value);
        }
        if (abDate > WayDate.MAXIMUM_ABSOLUTE_DATE) {
            throw new Error("Value is too large: " + value);
        }
        monthDayYear = WayDate.monthDayYearFromAbsolute(abDate);
        return new WayDate(monthDayYear[0], monthDayYear[1], monthDayYear[2]);
    },

    /**
     * Return the number of days between this date and another date
     *
     * @param {WayDate} anotherDate another date
     * @returns {number} the difference between the dates
     */
    difference: function (anotherDate) {
        "use strict";
        if (!anotherDate.valid()) {
            throw new Error("Invalid date");
        }
        return this.valueOf() - anotherDate.valueOf();
    },

    /**
     * Return true if the year is a leap year
     *
     * @returns {Boolean} true if the year is a leap year
     */
    leapYear: function () {
        "use strict";
        return WayDate.isLeapYear(this.year);
    },

    /**
     * Return the first day of the month for a date
     *
     * @returns {WayDate} the first day of the month
     */
    firstDayOfMonth: function () {
        "use strict";
        return new WayDate(this.month, 1, this.year);
    },

    /**
     * Return LESS if this date is LESS than another date.
     * Return EQUAL if two dates are equal
     * Return GREATER if this date is GREATER than another date
     *
     * @param {WayDate} anotherDate another date
     * @returns LESS, EQUAL, GREATER
     */
    compare: function (anotherDate) {
        "use strict";
        var result, me, them;
        me = this.valueOf();
        them = anotherDate.valueOf();

        if (me < them) {
            result = WayDate.Compare.LESS;
        } else if (me > them) {
            result = WayDate.Compare.GREATER;
        } else {
            result = WayDate.Compare.EQUAL;
        }
        return result;
    },

    /**
     * Return -1 if this date is LESS than another date.
     * Return 0 if this date EQUAL another date.
     * Return 1 if this date is GREATER than another date.
     *
     * @param {WayDate} anotherDate another date
     * @returns {number} -1, 1, or 1
     */
    compareTo: function (anotherDate) {
        "use strict";
        var result = 0;
        var comp = this.compare(anotherDate);
        switch (comp) {
        case WayDate.Compare.LESS:
            result = -1;
            break;
        case WayDate.Compare.EQUAL:
            result = 0;
            break;
        case WayDate.Compare.GREATER:
            result = 1;
            break;
        default:
            throw new Error("Unrecognized compare typekey");
        }
        return result;
    }
};

WayDate.MINIMUM_YEAR = 1601;
WayDate.MAXIMUM_YEAR = 3999;
WayDate.MAXIMUM_ABSOLUTE_DATE = 876216;

WayDate.Compare = {
    LESS: -1,
    EQUAL: 0,
    GREATER: 1
};

/**
 * Return a date, given an absolute date
 *
 * @param {number} abDate an absolute date
 *  (1 <= abDate <= MAXIMUM_ABSOLUTE_DATE)
 * @returns {WayDate} date (date.absoluteDate() = abDate)
 */
WayDate.dateFromAbsolute = function (abDate) {
    "use strict";
    if (abDate < 1) {
        throw new Error("Absolute date cannot be less than 1: " + abDate);
    }
    if (abDate > WayDate.MAXIMUM_ABSOLUTE_DATE) {
        throw new Error("Absolute date is too large: " + abDate);
    }
    var monthDayYear = WayDate.monthDayYearFromAbsolute(abDate);
    return new WayDate(monthDayYear[0], monthDayYear[1], monthDayYear[2]);
};

/**
 * Return a date, given a year and day of year
 *
 * @param {number} dayOfYear the day of the year
 * @param {number} year
 * @returns {WayDate} a date
 */
WayDate.dateFromDayOfMonth = function (dayOfYear, year) {
    "use strict";
    if (year < WayDate.MINIMUM_YEAR) {
        throw new Error("Year cannot be less than minimum year: " + year);
    }
    if (year > WayDate.MAXIMUM_YEAR) {
        throw new Error("Year cannot be greater than maximum year: " + year);
    }
    if (dayOfYear < 1) {
        throw new Error("Day of year cannot be less than one: " + dayOfYear);
    }
    if (dayOfYear > WayDate.daysInYear(year)) {
        throw new Error("Day of year cannot be greater than days in year: " +
            dayOfYear);
    }
    var monthDay = WayDate.monthDayFromDayOfYear(dayOfYear, year);
    return new WayDate(monthDay[0], monthDay[1], year);
};

/**
 * Return today's date
 *
 * @returns {WayDate} a date with the current month, day, and year
 */
WayDate.today = function () {
    "use strict";
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    return new WayDate(month, day, year);
};

/**
 * Return true if the year is a leap year.
 *
 * @param {number} year the year being tested
 * @returns {Boolean} true if year is a leap year
 */
WayDate.isLeapYear = function (year) {
    "use strict";
    var result = false;
    if (year % 400 === 0) {
        result = true;
    } else if (year % 100 === 0) {
        result = false;
    } else if (year % 4 === 0) {
        result = true;
    }
    return result;
};

/**
 * Return the number of days in the month.
 *
 * @param {number} month
 * @param {number} year
 * @returns {number} the number of days in the month
 */
WayDate.daysInMonth = function (month, year) {
    "use strict";
    var daysInLeapYear, daysInRegYear, numberDaysInMonth;

    if (month < 1) {
        throw new Error("daysInMonth: illegal value of month: " + month);
    } else if (month > 12) {
        throw new Error("daysInMonth: illegal value of month: " + month);
    }

    daysInLeapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    daysInRegYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (WayDate.isLeapYear(year)) {
        numberDaysInMonth = daysInLeapYear[month - 1];
    } else {
        numberDaysInMonth = daysInRegYear[month - 1];
    }
    return numberDaysInMonth;
};

/**
 * Return the number of days in a year.
 *
 * @param {number} year the year being specified
 * @return {number} number of days in the year
 */
WayDate.daysInYear = function (year) {
    "use strict";
    var days;
    if (year < WayDate.MINIMUM_YEAR) {
        throw new Error("Invalid year: " + year);
    }
    if (year > WayDate.MAXIMUM_YEAR) {
        throw new Error("Invalid year: " + year);
    }
    if (WayDate.isLeapYear(year)) {
        days = 366;
    } else {
        days = 365;
    }
    return days;
};

/**
 * Return true if the combination of month, day, year.
 *
 * @param {number} month the month of the year 1 <= month <= 12
 * @param {number} day the day of the month 1 <= day <= 31
 * @param {number} year the year of the date 1600 < year < 4000
 */
WayDate.isValidDate = function (month, day, year) {
    "use strict";
    var result = true, numberDaysInMonth;
    if (typeof month !== "number") {
        result = false;
    }
    if (typeof day !== "number") {
        result = false;
    }
    if (typeof year !== "number") {
        result = false;
    }
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        result = false;
    }
    if (year < WayDate.MINIMUM_YEAR) {
        result = false;
    } else if (year > WayDate.MAXIMUM_YEAR) {
        result = false;
    } else if (month < 1) {
        result = false;
    } else if (month > 12) {
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
};

/**
 * Return the days in the specified year and prior years
 *
 * @param {number} year the specified year (1600 <= year <= MAXIMUM_YEAR
 * @returns {number} the days in prior years
 *  (0 <= days <= MAXIMUM_ABSOLUTE_DATE)
 */
WayDate.daysInPastYears = function (year) {
    "use strict";
    var y = year - 1600,
        days = 0;
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
};

/**
 * Return the day of the year.  1-Jan is day 1.
 *
 * @param {number} month
 * @param {number} day
 * @param {number} year
 * @returns {number} day of year.  (1 <= day <= daysInYear(year)
 *
 */
WayDate.dayOfYear = function (month, day, year) {
    "use strict";
    var dayInYear = Math.floor((367 * month - 362) / 12) + day;
    if (WayDate.isLeapYear(year) && (month > 2)) {
        dayInYear -= 1;
    } else if (!WayDate.isLeapYear(year) && (month > 2)) {
        dayInYear -= 2;
    }
    return dayInYear;
};

/**
 * Return the year of the absolute date
 *
 * @param {number} abDate an absolute date
 *  (1 <= abDate <= MAXIMUM_ABSOLUTE_DATE)
 * @returns {number} year associated with the absolute date
 */
WayDate.yearFromAbsolute = function (abDate) {
    "use strict";
    var year,
        d0 = abDate - 1,
        n400 = Math.floor(d0 / 146097), // Number of days in a 400 year cycle:
        d1 = d0 % 146097, // 400*365 + 100 - 3
        n100 = Math.floor(d1 / 36524),  // Number of days in 100 year cycle:
        d2 = d1 % 36524,  // 365*100 + 25 - 1
        n4 = Math.floor(d2 / 1461),   // Number of days in 4 year cycle:
        d3 = d2 % 1461,   // 365*4 + 1
        n1 = Math.floor(d3 / 365);    // Number of days in 1 year:
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
};

/**
 * Return an array of two elements with the month and day derived from
 * an absolute date.
 *
 * @param {number} dayOfYear day of year (1 <= dayOfYear <= daysInYear(year)
 * @param {number} year (MINIMUM_YEAR <= year <= MAXIMUM_YEAR)
 * @returns {Array} the month and day of the year
 */
WayDate.monthDayFromDayOfYear = function (dayOfYear, year) {
    "use strict";
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
    var day = 1,
        month = 1,
        diff = dayOfYear - 1;
    //
    // loops through until the difference is 0
    //
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
};

/**
 * Return an array with the month, day, and year based on an absolute
 * date.
 *
 * @param abDate an absolute date
 * @returns {Array} an array with month, day, year
 */
WayDate.monthDayYearFromAbsolute = function (abDate) {
    "use strict";
    if (abDate < 1) {
        throw new Error("Absolute date must not be less than 1: " + abDate);
    }
    if (abDate > WayDate.MAXIMUM_ABSOLUTE_DATE) {
        throw new Error("Absolute date must not be larger than maximum: " +
            abDate);
    }
    var year = WayDate.yearFromAbsolute(abDate),
        dayOfYear = abDate - WayDate.daysInPastYears(year - 1),
        monthDay = WayDate.monthDayFromDayOfYear(dayOfYear, year);
    return [monthDay[0], monthDay[1], year];
};
