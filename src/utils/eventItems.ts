/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData, IntervalType, Marker } from '../types/misc';

const getDateStringToCompareByIntervalType = (intervalType: IntervalType, period: Date) => {
    let periodStr = '';
    switch (intervalType) {
        case 'day':
            periodStr = `${period.getFullYear()}/${period.getMonth()}/${period.getDate()}`;
            break;
        case 'month':
            periodStr = `${period.getFullYear()}/${period.getMonth()}`;
            break;
    }
    return periodStr;
}

export const populateMarkers = (intervalType: IntervalType, headerData: Array<HeaderData>, events: Array<EventItem>, itemWidth: number): Array<Marker> => {
    const newEvents = [...events];
    let allItems: Array<Date> = [];
    headerData.forEach(h => {
        allItems = allItems.concat([...h.items])
    });

    const markers: Array<Marker> = [];
    let maxLeftWidthMarker: Marker;

    Object.keys(events).forEach((v, idx) => {
        const event = events[idx];
        const eventStartStr = getDateStringToCompareByIntervalType(intervalType, event.startPeriod);
        const eventEndStr = getDateStringToCompareByIntervalType(intervalType, event.endPeriod);

        let gridRow = '1 / 3';
        const nextEvent = newEvents[idx + 1];
        if (nextEvent && nextEvent.groupId === event.groupId) {
            const diff = nextEvent.startPeriod.getTime() - event.endPeriod.getTime();
            gridRow = diff < 0 ? '1 / 2' : ' 1 / 3';
        }

        let left = 0;
        let width = 0;
        let addingWidth = false;

        for (let date of allItems) {
            const dateStr = getDateStringToCompareByIntervalType(intervalType, date);
            const isStart = dateStr === eventStartStr;
            const isEnd = dateStr === eventEndStr;
            if (isEnd) {
                addingWidth = false;
                width += itemWidth;

                if (intervalType === 'month') {
                    const daysLeft = Math.round((itemWidth / 30) * event.startPeriod.getDate());
                    left += daysLeft;
                }

                const maxLeftWidthSum = maxLeftWidthMarker ? maxLeftWidthMarker.width + maxLeftWidthMarker.left : 0;
                const leftWidthSum = left + width;

                if (maxLeftWidthMarker && left < maxLeftWidthSum) {
                    if (maxLeftWidthMarker.gridRow === '1 / 2') {
                        gridRow = '2 / 3';
                    } else if (maxLeftWidthMarker.gridRow === '2 / 3') {
                        gridRow = '1 / 2';
                    }
                }

                const marker = {
                    ...newEvents[idx],
                    left,
                    width,
                    gridRow,
                };

                if (maxLeftWidthSum <= leftWidthSum) {
                    maxLeftWidthMarker = marker;
                }

                markers.push(marker);
                break;
            }
            if (isStart) {
                addingWidth = true;
                width += itemWidth;
            } else if (addingWidth) {
                width += itemWidth;
            } else {
                left += itemWidth;
            }
        }
    });

    return markers;
}

