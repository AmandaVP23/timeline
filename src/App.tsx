/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import Timeline from './components/elements/Timeline';
import { Group, EventItem } from './types/misc';

const groups: Array<Group> = [
    { id: 1, title: 'Group 1' },
    { id: 2, title: 'Group 2' },
    { id: 3, title: 'Group 3' },
    { id: 4, title: 'Lucas' },
];

const events: Array<EventItem> = [{
    id: 11, groupId: 1,
    title: 'Event 1-1',
    startPeriod: new Date(2021, 10, 8),
    endPeriod: new Date(2021, 10, 15),
}, {
    id: 12,
    groupId: 1,
    title: 'Event 1-2',
    startPeriod: new Date(2021, 10, 10),
    endPeriod: new Date(2021, 11, 13)
}, {
    id: 13,
    groupId: 1,
    title: 'Event 1-3',
    startPeriod: new Date(2021, 10, 22),
    endPeriod: new Date(2021, 10, 29),
}, {
    id: 14,
    groupId: 1,
    title: 'Event 1-4',
    startPeriod: new Date(2021, 10, 30),
    endPeriod: new Date(2021, 11, 15)
}, {
    id: 31,
    groupId: 3,
    title: 'Event 2-1',
    startPeriod: new Date(2021, 11, 10),
    endPeriod: new Date(2021, 11, 14),
    backgroundColor: '#FF1122',
}, {
    id: 32,
    groupId: 3,
    title: 'Event 2-2',
    startPeriod: new Date(2021, 11, 20),
    endPeriod: new Date(2021, 11, 25),
    backgroundColor: '#FF1122',
}];

// const eventRenderer = (eventItem: EventItem, style: any) => {
//     return <div className="ct-event" style={{ ...style, backgroundColor: '#123123' }}>
//         {eventItem.title}
//     </div>
// }

function App() {
    return (
        <Timeline
            groups={groups}
            intervalType="day"
            startPeriod={new Date(2021, 10, 7)}
            endPeriod={new Date(2021, 11, 24)}
            events={events}
            //eventRenderer={eventRenderer}
        />
    );
}

export default App;
