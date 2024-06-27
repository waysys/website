/*
 * Copyright (c) 2016 William Shaffer
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 23-Jun-2024 W Shaffer  File created
 */

import { WayDate } from "../model/WayDate.js";

/* --------------------------------------------------------------------------
* Support Functions
----------------------------------------------------------------------------- */

/**
 * Set the value on an input.
 * 
 * @param {string} id the id of the element beginning with #
 * @param {string/number} value the value to be applied
 */
function setValue(id, value) {
    const inpt = document.querySelector(id);
    if (inpt === null) {
        throw new Error("Input with id could not be found: " + id);
    }
    inpt.value = value;
}

/**
 * getValue returns the value of an input.
 * 
 * @param {string} id the id of the element beginning with #
 * @returns the value from the input
 */
function getValue(id) {
    const inpt = document.querySelector(id);
    if (inpt == null) {
        throw new Error("Input with id could not be found: " + id);
    }
    return inpt.value;
}

/** 
 * getValueInt returns the value of an input as an integer.
 * If the value cannot be converted to an integer, return
 * NaN.
 * 
 * @param {string} id the id of the element beginning with #
 * @returns the value from the input
 */
function getValueInt(id) {
    const result = getValue(id);
    let value = NaN;
    if (typeof result === "string") {
        value = parseInt(result, 10);
    } else if (typeof result === "number") {
        value = result;
    }
    return value;
}

/**
 * setText sets the text on an element with the specified
 * id.
 * 
 * @param {string} id the id of the element starting with #
 * @param {string} text the text for the element 
 */
function setText(id, text) {
    const elem = document.querySelector(id);
    if (elem === null) {
        throw Error("Cannot find element with id: " + id);
    }
    elem.textContent = text;
}

/* --------------------------------------------------------------------------
* Element Functions
----------------------------------------------------------------------------- */

/** 
 * setRequestDate sets up the initial values of
 *   month, day, and year of the requested date.
 *
 * @param {WayDate} date the date for initial set up
 *
 */
function setRequestDate(date) {
    const month = date.month;
    const day = date.day;
    const year = date.year;
    setValue("#month", month);
    setValue("#day", day);
    setValue("#year", year);
}


/**
 * displayError displays an error message for the user
 * on the element with the error id.
 * 
 * @param {string} text the error message
 */
function displayError(text) {
    setText("#error", text);
}

/**
 * getRequestedDate returns the date set by the user
 * in the requested date fields.  Null is returned
 * if the user has made an error in entering the
 * month, day, and year.
 * 
 * @returns {WayDate} an instance of WayDate
 */
function getRequestedDate() {
    const month = getValueInt('#month');
    const day = getValueInt('#day');
    const year = getValueInt('#year');
    let thisDate = null;
    if (!WayDate.isValidDate(month, 1, 1900)) {
        displayError("Please enter a valid month between 1 and 12");
    } else if (!WayDate.isValidDate(1, day, 2024)) {
        displayError("Please enter a valid day between 1 and 31");
    } else if (!WayDate.isValidDate(1, 1, year)) {
        displayError("Please enter a valid year between 1601 and 3999");
    } else {
        try {
            thisDate = new WayDate(month, day, year);
        } catch (e) {
            displayError(e.toString());
        }
    }
    return thisDate;
}

/**
 * Set date information fields
 */
function setDateInformation() {
    const date = getRequestedDate();
    if (date !== null) {
        const dayOfYear = date.dayYear();
        const isLeapYear = date.leapYear();
        const dayOfWeek = date.dayOfWeek();
        setValue("#DayOfYear", "" + dayOfYear);
        setValue("#IsLeapYear", isLeapYear ? "Yes" : "No");
        setValue("#DayOfWeek", dayOfWeek)
    }
}

/**
 * Return the day of the month for a given position in the calendar.  The calendar is a two dimensional table
 * with 7 columns for each day in the week, and 6 rows.  (Not all rows are used for all months.)
 *
 * @param {WayDate} date a date in the month to be represented in the calendar
 * @param row {number} the row in the calendar (0 <= row < 6)
 * @param dayOfWeek {number} the day of the week as a number (0 <= dayOfWeek < 7)
 * @returns {string} a string with the day of month where appropriate.
 */
function dayInCalendar(date, row, dayOfWeek) {
    const firstDayInMonth = date.firstDayOfMonth().dayOfWeekNumber();
    const dayInMonth = 7 * row + dayOfWeek - firstDayInMonth;
    const month = date.month;
    const year = date.year;
    let result = "";
    if (dayInMonth < 0) {
        result = "___";
    } else if (dayInMonth >= WayDate.daysInMonth(month, year)) {
        result = "___";
    } else {
        result = "" + (dayInMonth + 1);
    }
    return result;
}

/**  
 * displayCalendar populates the calendar table
 *
 * @param {WayDate} date a date in the month of the calendar
 */
function displayCalendar() {
    const date = getRequestedDate();
    if (date !== null) {
        //
        // Fetch calendar table
        //
        const calendar = document.querySelector('#calendar');
        if (calendar === null) {
            throw Error("Unable to retrieve calendar table");
        }
        //
        // Set text for rable rows
        //
        let rows = calendar.querySelectorAll('tr');
        if (rows.length === 0) {
            throw Error("No rows found in calendar");
        }
        let rowNum = 0;
        for (let row of rows) {
            if (rowNum > 0) {
                processRow(row, rowNum, date);
            }
            rowNum++;
        }
        //
        // Set caption
        //
        const caption = calendar.querySelector('caption')
        const monthAbbrev = date.monthAbbrev(date.month)
        caption.textContent = monthAbbrev + ' ' + date.year
    }
}

/**
 * processRow populates a row 
 * 
 * @param {Element} row a <tr> element containing <td> elements
 * @param {int} rowNum the row in the table (0 < row <= 6)
 * @param {WayDate} date a date in the month being displayed
 */
function processRow(row, rowNum, date) {
    let cells = row.querySelectorAll('td');
    if (cells.length != 7) {
        throw Error("Row does not have 7 cells.  Row number is: " + rowNum)
    }
    let dayOfWeek = 0;
    for (let cell of cells) {
        let value = dayInCalendar(date, rowNum - 1, dayOfWeek)
        cell.textContent = value;
        dayOfWeek++
    }
}

/* --------------------------------------------------------------------------
* Event Listeners
----------------------------------------------------------------------------- */

/**
 * calcEventListener listens for the onClick event and updates the screen.
 * 
 * @param {Event} event the event object
 */
function calcEvenListener(event) {
    console.log("event received: " + event.type)
    setDateInformation();
    displayCalendar();
}

/**
 * setUp is a listenter that listens for the "load" event on the window,
 * sets other event listeners, and sets display values.
 */
function setUpEvent() {
    console.log("Executing setUp")
    //
    // Set event listener on Calculate button
    //
    let b = document.querySelector('#calculate');
    if (b === null) {
        throw new Error("<button id = calculate> was not found");
    } else {
        b.addEventListener("click", calcEvenListener)
        console.log("Event listener on button is set.")
    }
    //
    // Initialize fields
    //
    setRequestDate(WayDate.today());
    setDateInformation();
    displayCalendar();
}

window.addEventListener("load", setUpEvent, false)
