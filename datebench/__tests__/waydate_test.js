/**
 * This test suite checks the WayDate class implementation
 * 
 * Copyright (c) 2024 William Shaffer
 * 
 */

import { expect, test, describe } from '@jest/globals';
import { WayDate } from "../model/WayDate.js"

// ----------------------------------------------------------------------------

describe('month abbreviation', () => {
    test('valid month number passes', () => {
        const month = 1;
        expect(WayDate.monthAbbrev(month)).toEqual('Jan');
    });

    test('invalid month number low', () => {
        const tf = () => {
            const month = 0;
            let abbr = WayDate.monthAbbrev(month);
            return abbr;
        }
        expect(tf).toThrow(Error)
    })

    test('invalid month number high', () => {
        const tf = () => {
            const month = 13;
            let abbr = WayDate.monthAbbrev(month)
            return abbr
        }
        expect(tf).toThrow(Error)
    })
})

// ----------------------------------------------------------------------------

describe('day of week abreviation', () => {
    test('valid day of week', () => {
        const dayOfWeek = 0;
        expect(WayDate.dayOfWeekAbbrev(dayOfWeek)).toEqual('Sun')
    })

    test('invalid day of week negative', () => {
        const tf = () => {
            const dayOfWeek = -1;
            let abbr = WayDate.dayOfWeekAbbrev(dayOfWeek);
            return abbr
        }
        expect(tf).toThrowError();
    })

    test('invalid day of week too large', () => {
        
    })
})
