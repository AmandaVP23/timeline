/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { EventItem, HeaderData } from '../../types/misc';
import { populateMarkers } from '../../utils/eventItems';

const dayHeaderData: Array<HeaderData> = [{
    headerDate: new Date(2021, 10, 1),
    items: [
        new Date(2021, 10, 1),
        new Date(2021, 10, 2),
        new Date(2021, 10, 3),
        new Date(2021, 10, 4),
        new Date(2021, 10, 5),
        new Date(2021, 10, 6),
        new Date(2021, 10, 7),
        new Date(2021, 10, 8),
    ],
}];

const weekHeaderData: Array<HeaderData> = [{
    headerDate: new Date(2021, 10, 1),
    items: [
        new Date(2021, 10, 1),
        new Date(2021, 10, 8),
        new Date(2021, 10, 15),
    ],
}];

const monthHeaderData: Array<HeaderData> = [{
    headerDate: new Date(2021, 9, 1),
    items: [
        new Date(2021, 9, 1),
        new Date(2021, 10, 1),
        new Date(2021, 11, 1),
    ],
}];

const dayEvents: Array<EventItem> = [{
    id: 1,
    groupId: 1,
    title: 'Event 1',
    startPeriod: new Date(2021, 10, 1),
    endPeriod: new Date(2021, 10, 3),
}, {
    id: 2,
    groupId: 1,
    title: 'Event 2',
    startPeriod: new Date(2021, 10, 4),
    endPeriod: new Date(2021, 10, 6),
}, {
    id: 3,
    groupId: 1,
    title: 'Event 3',
    startPeriod: new Date(2021, 10, 5),
    endPeriod: new Date(2021, 10, 7),
}, {
    id: 4,
    groupId: 1,
    title: 'Event 4',
    startPeriod: new Date(2021, 10, 6),
    endPeriod: new Date(2021, 10, 8),
}];

const weekEvents: Array<EventItem> = [{
    id: 1,
    groupId: 1,
    title: 'Event 1',
    startPeriod: new Date(2021, 10, 1),
    endPeriod: new Date(2021, 10, 8),
}];

const monthEvents: Array<EventItem> = [{
    id: 1,
    groupId: 1,
    title: 'Event 1',
    startPeriod: new Date(2021, 10, 1),
    endPeriod: new Date(2021, 10, 30),
}];

describe('eventItems utils test', () => {
    it('populateMarkers - day', () => {
        const result = populateMarkers('day', dayHeaderData, dayEvents, 100);
        expect(result).toEqual([{
            id: 1,
            groupId: 1,
            title: 'Event 1',
            startPeriod: new Date(2021, 10, 1),
            endPeriod: new Date(2021, 10, 3),
            left: 0,
            width: 200,
            position: 'full'
        }, {
            id: 2,
            groupId: 1,
            title: 'Event 2',
            startPeriod: new Date(2021, 10, 4),
            endPeriod: new Date(2021, 10, 6),
            left: 300,
            width: 200,
            position: 'top'
        }, {
            id: 3,
            groupId: 1,
            title: 'Event 3',
            startPeriod: new Date(2021, 10, 5),
            endPeriod: new Date(2021, 10, 7),
            left: 400,
            width: 200,
            position: 'bottom'
        }, {
            id: 4,
            groupId: 1,
            title: 'Event 4',
            startPeriod: new Date(2021, 10, 6),
            endPeriod: new Date(2021, 10, 8),
            left: 500,
            width: 200,
            position: 'top'
        }])
    });

    it('populateMarkers - week', () => {
        const result = populateMarkers('week', weekHeaderData, weekEvents, 100);

        expect(result).toEqual([{
            id: 1,
            groupId: 1,
            title: 'Event 1',
            startPeriod: new Date(2021, 10, 1),
            endPeriod: new Date(2021, 10, 8),
            left: 0,
            width: 100,
            position: 'full'
        }]);
    })

    it('populateMarkers - month', () => {
        const result = populateMarkers('month', monthHeaderData, monthEvents, 100);

        expect(result).toEqual([{
            id: 1,
            groupId: 1,
            title: 'Event 1',
            startPeriod: new Date(2021, 10, 1),
            endPeriod: new Date(2021, 10, 30),
            left: 103.47222222222223,
            width: 96.66666666666667,
            position: 'full'
        }]);
    });

    it('handles has empty header data', () => {
        const result = populateMarkers('day', [], dayEvents, 100);
        expect(result).toEqual([]);
    });

    it('handles has empty header data items', () => {
        const data = [{
            headerDate: new Date(),
            items: [],
        }];

        const result = populateMarkers('day', data, dayEvents, 100);
        expect(result).toEqual([]);
    });
});
