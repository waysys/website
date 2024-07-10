/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 29-Dec-2016 W Shaffer  File created
 * 08-Jul-2024 W Shaffer  Converted to ES6
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
 * @param {string} suffix either "1" or "2" to indicate which field
 */
function displayError(text, suffix) {
    dsp.setText(document, "#error" + suffix, text);
}

/**
 * getDate returns the date set by the user
 * in the requested date fields.  Null is returned
 * if the user has made an error in entering the
 * month, day, and year.
 * 
 * @returns {WayDate} an instance of WayDate
 */
function getDate() {
    const month = dsp.getValueInt(document, '#month1');
    const day = dsp.getValueInt(document, '#day1');
    const year = dsp.getValueInt(document, '#year1');
    let thisDate = null;
    if (!WayDate.isValidDate(month, 1, 1900)) {
        displayError("Please enter a valid month between 1 and 12", "1");
    } else if (!WayDate.isValidDate(1, day, 2024)) {
        displayError("Please enter a valid day between 1 and 31", "1");
    } else if (!WayDate.isValidDate(1, 1, year)) {
        displayError("Please enter a valid year between 1601 and 3999", "1");
    } else {
        try {
            thisDate = new WayDate(month, day, year);
        } catch (e) {
            displayError(e.toString(), "1");
            thisDate = null
        }
    }
    return thisDate;
}

/**
 * displayDate displays the date based on the absolute date.
 * 
 * @param {int} absoluteDate an absolute date
 * @param {string} suffix either "1" or "2" to indicate which field
 */
function displayDate(absoluteDate, suffix) {
    const date = WayDate.dateFromAbsolute(absoluteDate);
    dsp.setValue(document, "#month" + suffix, date.month);
    dsp.setValue(document, "#day" + suffix, date.day);
    dsp.setValue(document, "#year" + suffix, date.year);
}

/**
 * Display the absolute date.
 * 
 * @param {int} absoluteDate the calculated absolute date
 * @param {string} suffix either "1" or "2" to indicate which field
 */
function displayAbsoluteDate(absoluteDate, suffix) {
    dsp.setValue(document, "#absolute" + suffix, absoluteDate);
}

/**
 * Return the entered absolut date.
 * 
 * @returns {int} the absolute date entered by the user
 */
function getAbsoluteDate() {
    let absoluteDate = dsp.getValueInt(document, "#absolute2");
    if (!WayDate.isAboluteDate(absoluteDate)) {
        displayError("Invalid absolute date: " + absoluteDate, "2");
        absoluteDate = 0;
    }
    return absoluteDate
}


// ----------------------------------------------------------------------------
// Event Listeners
// ----------------------------------------------------------------------------

/**
 * calcEventListener listens for the onClick event and updates the screen.
 * This event listener handles the first form.
 * 
 * @param {Event} event the event object
 */
function calcEventListener1(event) {
    console.log("event 1 received: " + event.type);
    displayError("", "1");
    const date = getDate();
    if (date != null) {
        const absoluteDate = date.valueOf();
        displayAbsoluteDate(absoluteDate, "1");
    }
}

/**
 * calcEventListener listens for the onClick event and updates the screen.
 * 
 * @param {Event} event the event object
 */
function calcEventListener2(event) {
    console.log("event 2 received: " + event.type);
    displayError("", "2");
    const absoluteDate = getAbsoluteDate();
    if (absoluteDate > 0) {
        displayDate(absoluteDate, "2");
    }
}

/**
 * setUp is a listenter that listens for the "load" event on the window,
 * sets other event listeners, and sets display values.
 */
function setUpEvent() {
    console.log("Executing setUp");
    //
    // Set event listener on Calculate button
    //
    dsp.setEventListenClick(document, '#calculate1', calcEventListener1);
    dsp.setEventListenClick(document, '#calculate2', calcEventListener2);
    console.log("Event listener on button is set.");
    //
    // Initialize fields
    //
    const today = WayDate.today();
    const absoluteDate = today.valueOf();
    displayError("", "1");
    displayError("", "2")
    displayDate(absoluteDate, "1");
    displayDate(absoluteDate, "2");
    displayAbsoluteDate(absoluteDate, "1");
    displayAbsoluteDate(absoluteDate, "2");
}

dsp.setEventListener(window, setUpEvent)
