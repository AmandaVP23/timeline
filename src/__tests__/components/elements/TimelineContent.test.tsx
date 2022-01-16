/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Group, Marker, MarkerPosition } from '../../../types/misc';
import { render } from '@testing-library/react';
import TimelineContent from '../../../components/elements/TimelineContent';

const groups: Array<Group> = [{
    id: 1,
    title: 'Group 1',
}, {
    id: 2,
    title: 'Group 2',
}];

const markers: Array<Marker> = [{
    id: 100,
    groupId: groups[0].id,
    title: 'Event 1',
    startPeriod: new Date(2021, 3, 5),
    endPeriod: new Date(2021, 3, 10),
    width: 100,
    left: 100,
    backgroundColor: '#000000',
    position: MarkerPosition.Full,
}, {
    id: 200,
    groupId: groups[1].id,
    title: 'Event 2',
    startPeriod: new Date(2021, 3, 12),
    endPeriod: new Date(2021, 3, 17),
    width: 100,
    left: 100,
    position: MarkerPosition.Top,
}, {
    id: 201,
    groupId: groups[1].id,
    title: 'Event 3',
    startPeriod: new Date(2021, 3, 15),
    endPeriod: new Date(2021, 3, 22),
    width: 100,
    left: 100,
    position: MarkerPosition.Bottom,
}];

describe('TimelineContent test', () => {
    it('renders lines correctly', () => {
        const { getByTestId } = render(<TimelineContent
            groups={groups}
            columnsSize={5}
            headerItemWidth={50}
            markers={[]}
        />);

        expect(getByTestId(`scroll-line-${groups[0].id}`)).toBeInTheDocument();
        expect(getByTestId(`scroll-line-${groups[1].id}`)).toBeInTheDocument();
    });

    it('renders columns correctly', () => {
        const { getAllByTestId } = render(<TimelineContent
            groups={groups}
            columnsSize={5}
            headerItemWidth={50}
            markers={[]}
        />);

        expect(getAllByTestId('scroll-line-column')).toHaveLength(5 * groups.length);
    });

    it('renders markers', () => {
        const { getByText } = render(<TimelineContent
            groups={groups}
            columnsSize={5}
            headerItemWidth={50}
            markers={markers}
        />);

        expect(getByText(markers[0].title)).toBeInTheDocument();
        expect(getByText(markers[1].title)).toBeInTheDocument();
        expect(getByText(markers[2].title)).toBeInTheDocument();
    });

    it('handle eventRenderer defined', () => {
        const eventRenderer = jest.fn();
        render(<TimelineContent
            groups={groups}
            columnsSize={5}
            headerItemWidth={50}
            markers={markers}
            eventRenderer={eventRenderer}
        />);

        expect(eventRenderer).toHaveBeenCalledTimes(markers.length);
    });
});
