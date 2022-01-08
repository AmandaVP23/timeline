/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData, Marker } from '../types/misc';

export const populateMarkers = (headerData: Array<HeaderData>, events: Array<EventItem>, itemWidth: number): Array<Marker> => {
    const newEvents = [...events];
    let allItems: Array<Date> = [];
    headerData.forEach(h => {
        allItems = allItems.concat([...h.items])
    });

    const markers: Array<Marker> = [];
    let maxTopLeftWidthSum = 0;
    let maxBottomLeftWidthSum = 0;

    Object.keys(events).forEach((v, idx) => {
        const event = events[idx];
        // todo - create function that formats date and aceppts a format string
        const eventStartStr = `${event.startPeriod.getFullYear()}/${event.startPeriod.getMonth()}/${event.startPeriod.getDate()}`;
        const eventEndStr = `${event.endPeriod.getFullYear()}/${event.endPeriod.getMonth()}/${event.endPeriod.getDate()}`;

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
            const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
            const isStart = dateStr === eventStartStr;
            const isEnd = dateStr === eventEndStr;
            if (isEnd) {
                addingWidth = false;
                width += itemWidth;

                if (left < maxTopLeftWidthSum) {
                    gridRow = '2 / 3';
                } else if (left < maxBottomLeftWidthSum) {
                    gridRow = '1 / 2';
                }

                if (gridRow === '1 / 2') {
                    maxTopLeftWidthSum = left + width;
                } else if (gridRow === '2 / 3') {
                    maxBottomLeftWidthSum = left + width;
                }

                markers.push({
                    ...newEvents[idx],
                    left,
                    width,
                    gridRow,
                });
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
