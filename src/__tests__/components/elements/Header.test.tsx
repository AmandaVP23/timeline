/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { HeaderData } from '../../../types/misc';
import { render } from '@testing-library/react';
import Header from '../../../components/elements/Header';

const setHeaderItemWidth = jest.fn();

const headerData: Array<HeaderData> = [{
    headerDate: new Date(2021, 10, 1),
    items: [new Date(2021, 10, 5), new Date(2021, 10, 6)],
}, {
    headerDate: new Date(2021, 11, 1),
    items: [new Date(2021, 11, 2), new Date(2021, 11, 3)],
}];

describe('Header test', () => {
    it('calls setHeaderItemWidth', () => {
        render(<Header
            headerData={headerData}
            setHeaderItemWidth={setHeaderItemWidth}
            intervalType="day"
        />);

        expect(setHeaderItemWidth).toHaveBeenCalled();
    });

    it('handles days interval type', () => {
        const { getByTestId, getByText } = render(<Header
            headerData={headerData}
            setHeaderItemWidth={setHeaderItemWidth}
            intervalType="day"
        />);

        expect(getByText('November')).toBeInTheDocument();
        expect(getByText('December')).toBeInTheDocument();
        expect(getByTestId('header-item-november-5')).toBeInTheDocument();
        expect(getByTestId('header-item-november-6')).toBeInTheDocument();
        expect(getByTestId('header-item-december-2')).toBeInTheDocument();
        expect(getByTestId('header-item-december-3')).toBeInTheDocument();
    });

    it('handles week interval type', () => {
        const { getByTestId, getByText } = render(<Header
            headerData={headerData}
            setHeaderItemWidth={setHeaderItemWidth}
            intervalType="week"
        />);

        expect(getByText('November')).toBeInTheDocument();
        expect(getByText('December')).toBeInTheDocument();
        expect(getByTestId('header-item-november-5')).toBeInTheDocument();
        expect(getByTestId('header-item-november-6')).toBeInTheDocument();
        expect(getByTestId('header-item-december-2')).toBeInTheDocument();
        expect(getByTestId('header-item-december-3')).toBeInTheDocument();
    });

    it('handles month interval type', () => {
        const monthHeaderData: Array<HeaderData> = [{
            headerDate: new Date(2021, 10, 1),
            items: [new Date(2021, 10, 5), new Date(2021, 11, 6)],
        }];
        const { getByText } = render(<Header
            headerData={monthHeaderData}
            setHeaderItemWidth={setHeaderItemWidth}
            intervalType="month"
        />);

        expect(getByText('2021')).toBeInTheDocument();
        expect(getByText('November')).toBeInTheDocument();
        expect(getByText('December')).toBeInTheDocument();
    });
});
