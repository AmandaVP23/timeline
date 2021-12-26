/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import Timeline from './components/elements/Timeline';
import { Group } from './types/misc';

const groups: Array<Group> = [
    { id: 1, title: 'Group 1' },
    { id: 2, title: 'Group 2' },
    { id: 3, title: 'Group 3' },
    { id: 4, title: 'Lucas' },
]

function App() {
    return (
        <Timeline
            groups={groups}
            intervalType="day"
            startPeriod={new Date(2021, 10, 20)}
        />
    );
}

export default App;
