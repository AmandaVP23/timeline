/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { HeaderData, IntervalType } from '../types/misc';
import { getDaysDiff, getMonthLabel, getMonthsDiff } from './dates';

const handleDayIntervalType = (startPeriod: Date, endPeriod: Date) => {
    const daysDiff = getDaysDiff(startPeriod, endPeriod);

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

const handleWeekIntervalType = (startPeriod: Date, endPeriod: Date) => {
    let startWeekDayDiff = startPeriod.getDay() === 0 ? 6 : Math.abs(1 - startPeriod.getDay());
    const startDate = new Date(new Date(startPeriod).setDate(startPeriod.getDate() - startWeekDayDiff));

    const endWeekDayDiff = endPeriod.getDay() === 0 ? 1 : Math.abs(8 - endPeriod.getDay());
    const endDate = new Date(new Date(endPeriod).setDate(endPeriod.getDate() + endWeekDayDiff));

    const daysDiff = getDaysDiff(startDate, endDate);
    let headerData: Array<HeaderData> = [];

    for (let i = 0; i <= daysDiff; i += 7) {
        const auxDate = new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).setDate(startDate.getDate() + i));
        const monthStr = getMonthLabel(auxDate.getMonth());
        const idx = headerData.findIndex(h => getMonthLabel(h.headerDate.getMonth()) === monthStr && h.headerDate.getFullYear() === auxDate.getFullYear());

        if (idx < 0) {
            headerData.push({
                headerDate: new Date(auxDate.getFullYear(), auxDate.getMonth(), 1),
                items: [new Date(auxDate.valueOf())],
            });
        } else {
            const newHeaderData = {
                ...headerData[idx],
                items: [...headerData[idx].items, new Date(auxDate.valueOf())],
            };
            headerData[idx] = { ...newHeaderData };
        }
    }

    return headerData;
}

const handleMonthIntervalType = (startPeriod: Date, endPeriod: Date) => {
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
            const newHeaderData = {
                ...headerData[idx],
                items: [...headerData[idx].items, new Date(auxDate)],
            };
            headerData[idx] = { ...newHeaderData };
        }
    }

    return headerData;
}

export const calculateHeaderData = (intervalType: IntervalType, startPeriod: Date, endPeriod?: Date): Array<HeaderData> => {
    const endDate = endPeriod || new Date();

    switch (intervalType) {
        case 'day':
            return handleDayIntervalType(startPeriod, endDate);
        case 'week':
            return handleWeekIntervalType(startPeriod, endDate);
        case 'month':
            return handleMonthIntervalType(startPeriod, endDate);
    }
}
