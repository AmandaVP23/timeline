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
        expect(result).toBe(2);
    });

    it('getMonthLabel', () => {
        let result = getMonthLabel(0);
        expect(result).toBe('January');

        result = getMonthLabel(1);
        expect(result).toBe('February');

        result = getMonthLabel(2);
        expect(result).toBe('March');

        result = getMonthLabel(3);
        expect(result).toBe('April');

        result = getMonthLabel(4);
        expect(result).toBe('May');

        result = getMonthLabel(5);
        expect(result).toBe('June');

        result = getMonthLabel(6);
        expect(result).toBe('July');

        result = getMonthLabel(7);
        expect(result).toBe('August');

        result = getMonthLabel(8);
        expect(result).toBe('September');

        result = getMonthLabel(9);
        expect(result).toBe('October');

        result = getMonthLabel(10);
        expect(result).toBe('November');

        result = getMonthLabel(11);
        expect(result).toBe('December');
    });
});
