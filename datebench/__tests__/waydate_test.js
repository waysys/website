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
        const tf = () => {
            const dayOfWeek = 7;
            let abbr = WayDate.dayOfWeekAbbrev(dayOfWeek)
            return abbr
        }
        expect(tf).toThrowError();
    })
})

// ----------------------------------------------------------------------------

describe('month abbreviation', () => {
    const tests = [
        [1, 'Jan'],
        [2, 'Feb'],
        [3, 'Mar'],
        [4, 'Apr'],
        [5, 'May'],
        [6, 'Jun'],
        [7, 'Jul'],
        [8, 'Aug'],
        [9, 'Sep'],
        [10,'Oct'],
        [11,'Nov'],
        [12,'Dec']
    ];
    test.each(tests)('%s %s: test', (num, expected) => {
        let abbr = WayDate.monthAbbrev(num)
        expect(abbr).toEqual(expected)
      })
})

// ----------------------------------------------------------------------------

describe('date from day of year', () => {
    const tests = [
        [[1, 2023], new WayDate(1, 1, 2023)],
        [[366, 2024], new WayDate(12, 31, 2024)]
    ]
    test.each(tests)('day of year', (dayYear, expectedDate) => {
        let actualDate = WayDate.dateFromDayOfYear(...dayYear);
        expect(actualDate).toEqual(expectedDate)
    })

    test('leap year confusion', () => {
        const tf = () => {
            const year = 2023;
            let actualdDate = WayDate.dateFromDayOfYear(366, year);
            return actualdDate
        }
        expect(tf).toThrow(Error)
    })
})
