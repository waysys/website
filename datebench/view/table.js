/*
 * Copyright (c) 2016, 2024 William Shaffer
 *
 * Date        Author     Descriptions
 * ----------- ---------- -----------------------------------------------------
 * 05-Jul-2024 W Shaffer  File created
 */

export {Table, Row}

/**
 * This class populates a table
 */
class Table {

    /**
     * 
     * @param {Element} element the element containing the table
     * @param {string} id the identifier of the table
     * @constructor 
     */
    constructor(element, id) {
        this.tableElement = element.querySelector(id);
        if (this.tableElement === null) {
            throw new Error("Table with id could not be found: " + id);
        }
        this.rows = this.tableElement.querySelectorAll('tr');
        if (this.rows.length === 0) {
            throw Error("No rows found in calendar");
        }        
    }

    /**
     * Return number of rows.
     * 
     * @returns {int} the number of rows in the table
     */
    get numberRows() {
        return this.rows.length
    }

    /**
     * Return a row.
     * 
     * @param {int} index an index of the rows
     * @returns {row element} the desired row element
     */
    getRow(index) {
        if ((index < 0) || (index >= this.numberRows)) {
            throw Error("Invalid index for row length " + this.numberRows + ": " + index)
        }
        return new Row(this.rows[index])
    }
}

/**
 * This class populates a row
 */
class Row {

    /**
     * @param {Element} a row element
     * @constructor
     */
    constructor(element) {
        this.row = element
        this.cells = element.querySelectorAll('td');
        if (this.cells.length === 0) {
            throw Error("No cells found in row")
        }
    }

    /**
     * Return the number of cells in the row.
     */
    get numberCells() {
        return this.cells.length
    }

    /**
     * Set the text of the cell
     * 
     * @param {int} index an index of the cell
     * @param {string} text the content of the cell
     */
    setText(index, text) {
        if ((index < 0) || (index >= this.numberCell)) {
            throw Error("Invalid index for row length " + this.numberCells + ": " + index)
        }
        this.cells[index].textContent = text
    }
}