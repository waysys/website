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
        [10, 'Oct'],
        [11, 'Nov'],
        [12, 'Dec']
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

// ----------------------------------------------------------------------------

describe('leap year', () => {
    const tests = [
        [2024, true],
        [2023, false],
        [1900, false],
        [2000, true]
    ];

    test.each(tests)('%s %s: leap year test', (year, expected) => {
        let actual = WayDate.isLeapYear(year)
        expect(actual).toEqual(expected)
    })

})

// ----------------------------------------------------------------------------

describe('days in year', () => {
    const tests = [
        [2023, 365],
        [2000, 366],
    ];

    test.each(tests)('%s %s: days in year test', (year, expected) => {
        let actual = WayDate.daysInYear(year);
        expect(actual).toEqual(expected);
    })
})

// ----------------------------------------------------------------------------

describe('day of year', () => {
    const tests = [
        [[1, 1, 2023], 1],
        [[1, 31, 2023], 31],
        [[12, 31, 2024], 366],
        [[7, 4, 2024], 186]
    ];

    test.each(tests)('%s %s: day of year', (date, expected) => {
        let actual = WayDate.dayOfYear(date[0], date[1], date[2]);
        expect(actual).toEqual(expected);
    })
})

// ----------------------------------------------------------------------------

describe('absolute date', () => {
    const tests = [
        [154683, new WayDate(7, 4, 2024)],
        [1, WayDate.MinDate],
        [WayDate.MAXIMUM_ABSOLUTE_DATE, WayDate.MaxDate]
    ]

    test.each(tests)('%s %s: absolute date', (abDate, expectedDate) => {
        let actualDate = WayDate.dateFromAbsolute(abDate);
        expect(actualDate).toEqual(expectedDate)
    })

    test.each(tests)('%s %s: value of', (expectedAbDate, date) => {
        let actualAbDate = date.valueOf();
        expect(actualAbDate).toEqual(expectedAbDate);
    })
})

// ----------------------------------------------------------------------------

describe('increment and decrement', () => {
    const tests = [
        [new WayDate(1, 1, 2024), new WayDate(1, 2, 2024)],
        [new WayDate(12, 31, 2023), new WayDate(1, 1, 2024)]
    ];

    test.each(tests)('%s %s: increment', (date, expectedDate) => {
        let actualDate = date.increment();
        expect(actualDate).toEqual(expectedDate);
    })
})