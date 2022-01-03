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
];

const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

const colWidth = 100 / days.length;

function App() {
    return (
        <Timeline
            groups={groups}
            days={days}
            colWidth={colWidth}
        />
    );
}

export default App;
