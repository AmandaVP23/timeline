/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { HeaderData, IntervalType } from '../types/misc';
import { getDaysDiff, getMonthLabel } from './dates';

export const calculateHeaderData = (intervalType: IntervalType, startPeriod: Date): Array<HeaderData> => {
    // todo - calcular por type
    // todo - pegar endPeriod - opcional

    const daysDiff = getDaysDiff(startPeriod, new Date());

    const headerData: Array<HeaderData> = [];

    for (let i = 0; i <= daysDiff; i++) {
        const auxDate = new Date(new Date(startPeriod).setDate(startPeriod.getDate() + i));
        const monthStr = getMonthLabel(startPeriod.getMonth());
        const idx = headerData.findIndex(h => h.label === monthStr);
        if (idx < 0) {
            headerData.push({
                label: monthStr,
                items: [auxDate.getDate().toString()],
            });
        } else {
            const newHeaderData = {
                ...headerData[idx],
                items: [...headerData[idx].items, auxDate.getDate().toString()],
            };
            headerData[idx] = { ...newHeaderData };
        }
    }

    return headerData;
}
