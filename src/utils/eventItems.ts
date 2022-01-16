/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData, IntervalType, Marker, MarkerPosition } from '../types/misc';
import { getDaysDiff } from './dates';

export const populateMarkers = (intervalType: IntervalType, headerData: Array<HeaderData>, events: Array<EventItem>, itemWidth: number): Array<Marker> => {
    if (headerData.length < 0) return [];

    const newEvents = [...events];
    const markers: Array<Marker> = [];
    let maxLeftWidthMarker: Marker;

    const firstDate = headerData[0].items[0];

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

