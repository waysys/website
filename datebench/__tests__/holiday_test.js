/**
 * This test suite checks the Holiday class implementation
 * 
 * Copyright (c) 2024 William Shaffer
 * 
 */

import { expect, test, describe } from '@jest/globals';
import { WayDate } from "../model/WayDate.js"
import { Holiday } from "../model/Holiday.js"

// ----------------------------------------------------------------------------

describe('Holiday', () => {

    test('New Years Day', () => {
        const year = 2024;
        const actualNYD = Holiday.newYearsDay(year);
        const expectedNYD = new WayDate(1, 1, year);
        expect(actualNYD).toEqual(expectedNYD);
    })
})

// ----------------------------------------------------------------------------

