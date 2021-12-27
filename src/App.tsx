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

const events: Array<EventItem> = [
    { id: 1, groupId: 1, title: 'Event 1', startPeriod: new Date(2021, 10, 23), endPeriod: new Date(2021, 10, 25) },
    { id: 1, groupId: 2, title: 'Event 2', startPeriod: new Date(2021, 10, 27), endPeriod: new Date(2021, 11, 12) },
];

function App() {
    return (
        <Timeline
            groups={groups}
            intervalType="day"
            startPeriod={new Date(2021, 10, 20)}
            events={events}
        />
    );
}

export default App;
