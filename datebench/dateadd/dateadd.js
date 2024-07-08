/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 * 07-Jul-2024 W Shaffer  Converted to ES6
 */

import { WayDate } from "../model/WayDate.js";
import { Display } from "../view/display.js";

const dsp = new Display()

// ----------------------------------------------------------------------------
// Element Functions
// ----------------------------------------------------------------------------

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
 * Read the month, day, and year.
 * 
 * @returns {WayDate} the date 
 */
function readMonthDayYear() {
    const month = dsp.getValueInt(document, '#month');
    const day = dsp.getValueInt(document, '#day');
    const year = dsp.getValueInt(document, '#year');
    if (!WayDate.isMonth(month)) {
        throw new Error("Month must be between 1 and 12, not: " + month)
    }
    if (!WayDate.isYear(year)) {
        throw new Error("Year must be between 1601 aand 3999, not: " + year)
    }
    const date = new WayDate(month, day, year);
    return date
}

/**
 * Set the month, day, and year
 */
function setMonthDayYear(date) {
    dsp.setValue(document, '#month', date.month);
    dsp.setValue(document, '#day', date.day);
    dsp.setValue(document, '#year', date.year);
}

/**
 * Read the amount to add to the date.
 * 
 * @returns {int} the amount to add to the date
 */
function readAddAmount() {
    const addAmount = dsp.getValueInt(document, "#days")
    return addAmount
}

/**
 * Set the amount to add to the date.
 * 
 * @param {int} days the number of days to add or subtract
 */
function setAddAmount(days) {
    dsp.setValue(document, "#days", "" + days)
}

/**
 * Set the date field
 * 
 * @param {WayDate} the calculated date
 * 
 */
function setDate(date) {
    dsp.setValue(document, "#date", date.toString())
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
    console.log("event received: " + event.type);
    displayError("");
    try {
        const date = readMonthDayYear();
        const addAmount = readAddAmount();
        const newDate = date.add(addAmount);
        setDate(newDate);
    } catch (e) {
        displayError(e.message)
    }
}

/**
 * setUp is a listenter that listens for the "load" event on the window,
 * sets other event listeners, and sets display values.
 */
function setUpEvent() {
    console.log("executing setUp")
    //
    // Set event listener on Calculate button
    //
    dsp.setEventListenClick(document, '#calculate', calcEventListener)
    console.log("Event listener on button is set.")
    //
    // Initialize fields
    //
    var today = WayDate.today()
    setMonthDayYear(today)
    setAddAmount(0);
    setDate(today);
    displayError("");
}

dsp.setEventListener(window, setUpEvent)
