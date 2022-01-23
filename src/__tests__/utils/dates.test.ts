/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { getDaysDiff, getMonthLabel, getMonthsDiff } from '../../utils/dates';

describe('dates utils test', () => {
    it('getDaysDiff', () => {
        const result = getDaysDiff(new Date(2021, 10, 5), new Date(2021, 10, 10));
        expect(result).toBe(5);
    });

    it('getMonthsDiff', () => {
        const result = getMonthsDiff(new Date(2021, 9, 5), new Date(2021, 11, 5));
        expect(result).toBe(3);
    });

    it('getMonthLabel', () => {
        let result = getMonthLabel(0);
        expect(result).toBe('Jan');

        result = getMonthLabel(1);
        expect(result).toBe('Feb');

        result = getMonthLabel(2);
        expect(result).toBe('Mar');

        result = getMonthLabel(3);
        expect(result).toBe('Apr');

        result = getMonthLabel(4);
        expect(result).toBe('May');

        result = getMonthLabel(5);
        expect(result).toBe('Jun');

        result = getMonthLabel(6);
        expect(result).toBe('Jul');

        result = getMonthLabel(7);
        expect(result).toBe('Aug');

        result = getMonthLabel(8);
        expect(result).toBe('Sep');

        result = getMonthLabel(9);
        expect(result).toBe('Oct');

        result = getMonthLabel(10);
        expect(result).toBe('Nov');

        result = getMonthLabel(11);
        expect(result).toBe('Dec');
    });
});
