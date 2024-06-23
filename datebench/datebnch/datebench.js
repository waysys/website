/*
 * Copyright (c) 2016 William Shaffer
 *
 * Date        Author     Descriptions
 * ----------- ---------- ----------------------------------------------------
 * 23-Jun-2024 W Shaffer  File created
 */

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
    const inpt = document.querySelector(id)
    if (inpt === null) {
        throw new Error("Input with id could not be found: " + id)
    }
    inpt.value = value
}

/**
 * getValue returns the value of an input.
 * 
 * @param {string} id the id of the element beginning with #
 * @returns the value from the input
 */
function getValue(id) {
    const inpt = document.querySelector(id)
    if (inpt == null) {
        throw new Error("Input with id could not be found: " + id)
    }
    return inpt.value
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
    const result = getValue(id)
    let value = NaN
    if (typeof result === "string") {
        value = parseInt(result, 10)
    } else if (typeof result === "int") {
        value = result
    }
    return value
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
    const month = date.month
    const day = date.day
    const year = date.year
    setValue("#month", month)
    setValue("#day", day)
    setValue("#year", year)
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
 * in the requested date fields
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
    return thisDate
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

/* --------------------------------------------------------------------------
* Event Listeners
----------------------------------------------------------------------------- */

/**
 * setUp is a listenter that listens for the "load" event on the window,
 * sets other event listeners, and sets display values.
 */
function setUpEvent() {
    console.log("Executing setUp")
    let b = document.querySelector('#calculate');
    if (b === null) {
        console.log("<button id = calculate> was not found");
    } else {
        b.addEventListener("click", setDateInformation)
        console.log("Event listener on button is set.")
    } 
    //
    // Initialize fields
    //
    setRequestDate(WayDate.today());
    setDateInformation();
}

window.addEventListener("load", setUpEvent, false)
console.log("Listeners set up")