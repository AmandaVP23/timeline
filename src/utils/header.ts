/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { HeaderData, IntervalType } from '../types/misc';
import { getDaysDiff, getMonthLabel, getMonthsDiff } from './dates';

const handleMonthIntervalType = (startPeriod: Date, endPeriod: Date) => {
    let auxDate = new Date(startPeriod);

    const monthsDiff = getMonthsDiff(startPeriod, endPeriod);
    const headerData: Array<HeaderData> = [];
    for (let i = 0; i < monthsDiff; i++) {
        const auxDate = new Date(new Date(startPeriod).setMonth(startPeriod.getMonth() + i));
        const year = auxDate.getFullYear();
        const idx = headerData.findIndex(h => h.headerDate.getFullYear() === year);

        if (idx < 0) {
            headerData.push({
                headerDate: new Date(auxDate.getFullYear(), auxDate.getMonth(), 1),
                items: [new Date(auxDate)],
            });
        } else {
            console.log("exists");
            const newHeaderData = {
                ...headerData[idx],
                items: [...headerData[idx].items, new Date(auxDate)],
            };
            headerData[idx] = { ...newHeaderData };
        }

        console.log(auxDate);
    }

    console.log("");
    console.log("");
    console.log("final");
    console.log(headerData);
}

export const calculateHeaderData = (intervalType: IntervalType, startPeriod: Date, endPeriod?: Date): Array<HeaderData> => {
    // todo - calcular por type

    const endDate = endPeriod || new Date();

    if (intervalType === 'month') {
        // todo - se não tiver mais que um mes entre start e end mostrar dias
        handleMonthIntervalType(startPeriod, endDate);
    }

    const daysDiff = getDaysDiff(startPeriod, endDate);

    const headerData: Array<HeaderData> = [];

    for (let i = 0; i <= daysDiff; i++) {
        const auxDate = new Date(new Date(startPeriod).setDate(startPeriod.getDate() + i));
        const monthStr = getMonthLabel(auxDate.getMonth());
        const idx = headerData.findIndex(h => getMonthLabel(h.headerDate.getMonth()) === monthStr);

        if (idx < 0) {
            headerData.push({
                headerDate: new Date(auxDate.getFullYear(), auxDate.getMonth(), 1),
                items: [new Date(auxDate)],
            });
        } else {
            const newHeaderData = {
                ...headerData[idx],
                items: [...headerData[idx].items, new Date(auxDate)],
            };
            headerData[idx] = { ...newHeaderData };
        }
    }

    return headerData;
}
