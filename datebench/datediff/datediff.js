/*
 * Copyright (c) 2016, 2024 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 * 07-Jul-2024 W Shaffer  Converted to ES6
 */

import { WayDate } from "../model/WayDate.js";
import { Display } from "../view/display.js";

const dsp = new Display()

// ---------------------------------------------------------------------------
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
 * Read date
 * 
 * @param {string} num "1" or "2" depending on the desired date
 * @returns {WayDate} the date composed from the month, day, and year
 */
function readDate(num) {
    if (num != "1" && num != "2") {
        throw new Error("Argument num must be either 1 or 2, not: " + num)
    }
    const month = dsp.getValueInt(document, '#month' + num);
    const day = dsp.getValueInt(document, '#day' + num);
    const year = dsp.getValueInt(document, '#year' + num);
    if (!WayDate.isMonth(month)) {
        throw new Error(num + ": Month must be between 1 and 12, not: " + month)
    }
    if (!WayDate.isYear(year)) {
        throw new Error(num + ":Year must be between 1601 aand 3999, not: " + year)
    }
    const date = new WayDate(month, day, year);
    return date
}

/**
 * Set date
 * 
 * @param {string} num "1" or "2" depending on the desired date
 * @param {WayDate} date a date providing the month, day, and year
 */
function setDate(num, date) {
    if (num != "1" && num != "2") {
        throw new Error("Argument num must be either 1 or 2, not: " + num);
    }
    dsp.setValue(document, "#month" + num, date.month); 
    dsp.setValue(document, "#day" + num, date.day);
    dsp.setValue(document, "#year" + num, date.year);  
}

/**
 * Set days
 * 
 * @param {int} diff the number of days between day1 and day2
 */
function setDays(diff) {
    dsp.setValue(document, "#days", diff)
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
        const date1 = readDate("1");
        const date2 = readDate("2");
        const result = date1.difference(date2);
        setDays(result);
    } catch (e) {
        displayError(e.message);
    }
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
    dsp.setEventListenClick(document, '#calculate', calcEventListener);
    console.log("Event listener on button is set.");
    //
    // Initialize fields
    //
    const today = WayDate.today();
    setDate("1", today);
    setDate("2", today);
    setDays(0);
    displayError("");
}

dsp.setEventListener(window, setUpEvent)
