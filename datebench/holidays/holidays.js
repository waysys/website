/*
 * Copyright (c) 2016 Waysys LLC
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 30-Dec-2016 W Shaffer  File created
 * 05-Jul-2024 W Shaffer  Updated to ES6
 */

import { Holiday } from "../model/Holiday.js";
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

function displayYear(year) {
    dsp.setValue(document, "#year", year)
}

function displayHolidays(year) {
    const holidays = Holiday.holidays(year)
    const table = dsp.getTable(document, "#holidays")
    const numRows = table.numberRows
    // One row is needed for the heading
    if (numRows <= holidays.length) {
        throw Error("Holiday table does not have enough rows for all holidays: " + numRows)
    }
    for (let i = 0; i < holidays.length; i++) {
        let holiday = holidays[i];
        let row = table.getRow(i + 1)
        if (row.numberCells < 4) {
            throw Error("Row in holiday table has too few cells: " + row.numberCells)
        }
        row.setText(0, holiday.name)
        row.setText(1, holiday.holiday.toString())
        row.setText(2, holiday.observedHoliday.toString())
        row.setText(3, holiday.observedDayOfWeek)
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
    const year = dsp.getValueInt(document, "#year")
    if ((year >= 1900) && (year <= 2399)) {
        displayHolidays(year)
    } else {
        displayError("Please enter a valid 4 digit year between 1900 and 2399")
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
    dsp.setEventListenClick(document, '#calculate', calcEventListener)
    console.log("Event listener on button is set.")
    //
    // Initialize fields
    //
    var today = WayDate.today()
    displayYear(today.year)
    displayError("")
    displayHolidays(today.year)
}

dsp.setEventListener(window, setUpEvent)

