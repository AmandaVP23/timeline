/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData } from '../types/misc';

export const populateEventsWidth = (headerData: Array<HeaderData>, events: Array<EventItem>, itemWidth: number) => {
    const newEvents = [...events];
    let allItems: Array<Date> = [];
    headerData.forEach(h => {
        allItems = allItems.concat([...h.items])
    });

    Object.keys(events).forEach(idx => {
        const event = events[Number(idx)];
        // todo - create function that formats date and aceppts a format string
        const eventStartStr = `${event.startPeriod.getFullYear()}/${event.startPeriod.getMonth()}/${event.startPeriod.getDate()}`;
        const eventEndStr = `${event.endPeriod.getFullYear()}/${event.endPeriod.getMonth()}/${event.endPeriod.getDate()}`;

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
                newEvents[Number(idx)] = {
                    ...newEvents[Number(idx)],
                    left,
                    width,
                }
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

    return newEvents;
}
