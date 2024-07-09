/*
 * Copyright (c) 2016 William Shaffer
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 23-Jun-2024 W Shaffer  File created
 */

import { WayDate } from "../model/WayDate.js";
import { Display } from "../view/display.js";

const dsp = new Display()

// ---------------------------------------------------------------------------
// Element Functions
// ----------------------------------------------------------------------------

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
    dsp.setValue(document, "#month", month);
    dsp.setValue(document, "#day", day);
    dsp.setValue(document, "#year", year);
}

/**
 * displayError displays an error message for the user
 * on the element with the error id.
 * 
 * @param {string} text the error message
 */
function displayError(text) {
    dsp.setText(document, "#error", text);
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
    const month = dsp.getValueInt(document, '#month');
    const day = dsp.getValueInt(document, '#day');
    const year = dsp.getValueInt(document, '#year');
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
        dsp.setValue(document, "#DayOfYear", "" + dayOfYear);
        dsp.setValue(document, "#IsLeapYear", isLeapYear ? "Yes" : "No");
        dsp.setValue(document, "#DayOfWeek", dayOfWeek)
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
        const calendar = dsp.getTable(document, '#calendar')
        //
        // Set text for rable rows
        //
        const numberRows = calendar.numberRows
        for (let rowNum = 1; rowNum < numberRows; rowNum++) {
            let row = calendar.getRow(rowNum)
            processRow(row, rowNum, date);
        }
        //
        // Set caption
        //
        // const caption = calendar.querySelector('caption')
        // const monthAbbrev = date.monthAbbrev(date.month)
        // caption.textContent = monthAbbrev + ' ' + date.year
    }
}

/**
 * processRow populates a row 
 * 
 * @param {Row} row an instance of Row
 * @param {int} rowNum the row in the table (0 < row <= 6)
 * @param {WayDate} date a date in the month being displayed
 */
function processRow(row, rowNum, date) {
    let dayOfWeek = 0;
    const numberCells = row.numberCells;
    for (let index = 0; index < numberCells; index++) {
        let value = dayInCalendar(date, rowNum - 1, dayOfWeek);
        row.setText(index, value)
        dayOfWeek++
    }
}

// ----------------------------------------------------------------------------
// Event Listeners
// ----------------------------------------------------------------------------

/**
 * calcEventListener listens for the onClick event and updates the screen.
 * 
 * @param {Event} event the event object
 */
function calcEventListener(event) {
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
    dsp.setEventListenClick(document, '#calculate', calcEventListener)
    console.log("Event listener on button is set.")
    //
    // Initialize fields
    //
    setRequestDate(WayDate.today());
    setDateInformation();
    displayCalendar();
}

dsp.setEventListener(window, setUpEvent)
