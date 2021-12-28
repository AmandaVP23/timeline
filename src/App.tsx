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
    id: 1, groupId: 1,
    title: 'Event 1',
    startPeriod: new Date(2021, 10, 23),
    endPeriod: new Date(2021, 10, 25),
}, {
    id: 2,
    groupId: 1,
    title: 'Event 2',
    startPeriod: new Date(2021, 10, 24),
    endPeriod: new Date(2021, 11, 1)
}, {
    id: 3,
    groupId: 3,
    title: 'Event 3',
    startPeriod: new Date(2021, 10, 25),
    endPeriod: new Date(2021, 11, 3),
    backgroundColor: '#FF1122',
}];

const eventRenderer = (eventItem: EventItem, style: any) => {
    return <div className="ct-event" style={{ ...style, backgroundColor: '#123123' }}>
        {eventItem.title}
    </div>
}

function App() {
    return (
        <Timeline
            groups={groups}
            intervalType="day"
            startPeriod={new Date(2021, 10, 20)}
            events={events}
            //eventRenderer={eventRenderer}
        />
    );
}

export default App;
