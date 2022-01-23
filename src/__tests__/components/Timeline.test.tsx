/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { EventItem, Group } from '../../types/misc';
import { render } from '@testing-library/react';
import Timeline from '../../components/Timeline';

const groups: Array<Group> = [{
    id: 1,
    title: 'Group 1',
}, {
    id: 2,
    title: 'Group 2',
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
}];

describe('Timeline tests', () => {
    it('renders correctly with day interval', () => {
         const { getByText } = render(<Timeline
             groups={groups}
             intervalType="day"
             startPeriod={new Date(2021, 10, 1)}
             endPeriod={new Date(2021, 10, 30)}
             events={dayEvents}
         />);

         expect(getByText(dayEvents[0].title)).toBeInTheDocument();
         expect(getByText(dayEvents[1].title)).toBeInTheDocument();
    });
});
