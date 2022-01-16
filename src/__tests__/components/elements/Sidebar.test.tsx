/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Group } from '../../../types/misc';
import { render } from '@testing-library/react';
import Sidebar from '../../../components/elements/Sidebar';

const groups: Array<Group> = [{
    id: 1,
    title: 'Group 1',
}, {
    id: 2,
    title: 'Group 2',
}];

const mockRenderGroupItem = jest.fn();

describe('Sidebar tests', () => {
    it('renders groups correctly', () => {
        const { getByText } = render(<Sidebar groups={groups} />);

        expect(getByText(groups[0].title)).toBeInTheDocument();
        expect(getByText(groups[1].title)).toBeInTheDocument();
    });

    it('handle defined renderGroupItem', () => {
        const { getByText } = render(<Sidebar groups={groups} renderGroupItem={mockRenderGroupItem} />);

        expect(mockRenderGroupItem).toHaveBeenCalledWith(
            {
                className: 'ct-sidebar-group-item ',
                'data-sidebar-item': groups[0].id,
            },
            groups[0],
        );

        expect(mockRenderGroupItem).toHaveBeenCalledWith(
            {
                className: 'ct-sidebar-group-item ',
                'data-sidebar-item': groups[1].id,
            },
            groups[1],
        );
    });
});
