/*
 * Copyright (c) 2016, 2024 William Shaffer
 *
 * Date        Author     Descriptions
 * ----------- ---------- -----------------------------------------------------
 * 05-Jul-2024 W Shaffer  File created
 */

export { Display }
import { Table } from "./table.js"

/**
 * This class helps manage the display of information on the web page.
 */
class Display {

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------

    /** 
     * @constructor
     */
    constructor() {

    }

    // ------------------------------------------------------------------------
    // Get and Set Values Functions
    // ------------------------------------------------------------------------

    /**
     * Set the value on an input.
     * 
     * @param {}
     * @param {string} id the id of the element beginning with #
     * @param {string/number} value the value to be applied
     */
    setValue(element, id, value) {
        const inpt = element.querySelector(id);
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
    getValue(element, id) {
        const inpt = element.querySelector(id);
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
    getValueInt(element, id) {
        const result = this.getValue(element, id);
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
    setText(element, id, text) {
        const elem = element.querySelector(id);
        if (elem === null) {
            throw Error("Cannot find element with id: " + id);
        }
        elem.textContent = text;
    }

    // ------------------------------------------------------------------------
    // Set event listeners
    // ------------------------------------------------------------------------

    /**
     * Set an event listener function on an element like a button
     * 
     * @param {Element} element to which the listener is attached
     * @param {string} id the identifier of the element
     * @param {function} func the event listener
     */
    setEventListenClick(element, id, func) {
        const b = element.querySelector(id);
        if (b === null) {
            throw new Error("Element with ID was not found: " + id);
        } else {
            b.addEventListener("click", func);
        }
    }

    /**
     * This method sets a setup function as an event listener on the window.
     * The setup function will be invoked when the web page has finished locaded.
     * The setup function should do two things:
     * 
     * -- set additional event listeners where needed, for example on buttons.
     * -- initialize the display of data on the web page.
     * 
     * @param {interface} window 
     * @param {function} fnc 
     */
    setEventListener(window, fnc) {
        window.addEventListener("load", fnc, false)
    }

    // ------------------------------------------------------------------------
    // Populate tables
    // ------------------------------------------------------------------------

    /**
     * Retrieve the table.
     * 
     * @param {Element} element the element containing the table
     * @param {string} id the identifier of the table
     * @returns {Table} the table object
     */
    getTable(element, id) {
        return new Table(element, id)
    }
}