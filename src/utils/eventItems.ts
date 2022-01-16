/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData, IntervalType, Marker, MarkerPosition } from '../types/misc';
import { getDaysDiff } from './dates';

const getDateStringToCompareByIntervalType = (intervalType: IntervalType, period: Date, previousMonday?: boolean) => {
    let periodStr = '';
    switch (intervalType) {
        case 'day':
            periodStr = `${period.getFullYear()}/${period.getMonth()}/${period.getDate()}`;
            break;
        case 'month':
            periodStr = `${period.getFullYear()}/${period.getMonth()}`;
            break;
        case 'week':
            if (previousMonday === undefined) {
                periodStr = `${period.getFullYear()}/${period.getMonth()}/${period.getDate()}`;
            } else if (previousMonday) {
                let previousMondayDiff = period.getDay() === 0 ? 6 : Math.abs(1 - period.getDay());
                const date = new Date(new Date(period).setDate(period.getDate() - previousMondayDiff));
                periodStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
            } else {
                let nextMondayDiff = period.getDay() === 0 ? 1 : Math.abs(8 - period.getDay());
                if (period.getDay() === 1) {
                    nextMondayDiff = 0;
                }
                const date = new Date(new Date(period).setDate(period.getDate() + nextMondayDiff));
                periodStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
            }
            break;
    }
    return periodStr;
}

export const populateMarkers = (intervalType: IntervalType, headerData: Array<HeaderData>, events: Array<EventItem>, itemWidth: number, groupHeight: number): Array<Marker> => {
    const newEvents = [...events];
    let allItems: Array<Date> = [];
    headerData.forEach(h => {
        allItems = allItems.concat([...h.items])
    });

    const markers: Array<Marker> = [];
    let maxLeftWidthMarker: Marker;

    const firstDate = allItems[0];

    console.log(firstDate);

    if (!firstDate) return [];

    Object.keys(events).forEach((v, idx) => {
        const event = events[idx];
        const diffDaysStart = getDaysDiff(firstDate, event.startPeriod);
        const eventDaysDuration = getDaysDiff(event.startPeriod, event.endPeriod);
        let left = 0;
        let width = 0;
        let position = MarkerPosition.Full;

        const nextEvent = newEvents[idx + 1];
        if (nextEvent && nextEvent.groupId === event.groupId) {
            const diff = nextEvent.startPeriod.getTime() - event.endPeriod.getTime();
            position = diff < 0 ? MarkerPosition.Top : MarkerPosition.Full;
        }

        let divider = 1;
        if (intervalType === 'week') {
            divider = 7;
        } else if (intervalType === 'month') {
            divider = 30;
        }

        left = (itemWidth / divider) * diffDaysStart;
        width = (itemWidth / divider) * eventDaysDuration;

        const maxLeftWidthSum = maxLeftWidthMarker && maxLeftWidthMarker.groupId === event.groupId ? maxLeftWidthMarker.width + maxLeftWidthMarker.left : 0;
        const leftWidthSum = left + width;

        if (maxLeftWidthMarker && left < maxLeftWidthSum) {
            if (maxLeftWidthMarker.position === MarkerPosition.Top) {
                position = MarkerPosition.Bottom;
            } else if (maxLeftWidthMarker.position === MarkerPosition.Bottom) {
                position = MarkerPosition.Top;
            }
        }
        const marker = {
            ...newEvents[idx],
            left,
            width,
            position,
        };

        if (maxLeftWidthSum <= leftWidthSum) {
            maxLeftWidthMarker = marker;
        }

        markers.push(marker);
    });

    return markers;
}

