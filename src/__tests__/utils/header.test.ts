/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { calculateHeaderData } from '../../utils/header';

describe('header utils test', () => {
    it('calculateHeaderData - day', () => {
        const result = calculateHeaderData('day', new Date(2021, 10, 1), new Date(2021, 11, 10));

        expect(result).toHaveLength(2);
        expect(result[0].items).toHaveLength(30);
        expect(result[1].items).toHaveLength(10);
    });

    it('calculateHeaderData - week', () => {
        const result = calculateHeaderData('week', new Date(2021, 10, 1), new Date(2021, 11, 2));

        expect(result).toHaveLength(2);
        expect(result[0].items).toHaveLength(5);
        expect(result[1].items).toHaveLength(1);
    });

    it('calculateHeaderData - month', () => {
        const result = calculateHeaderData('month', new Date(2021, 10, 1), new Date(2022, 0, 2));

        expect(result).toHaveLength(2);
        expect(result[0].items).toHaveLength(2);
        expect(result[1].items).toHaveLength(1);
    });
});
