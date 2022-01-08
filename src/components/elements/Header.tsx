/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useRef } from 'react';
import { HeaderData, IntervalType } from '../../types/misc';
import { getMonthLabel } from '../../utils/dates';

interface OwnProps {
    headerData: Array<HeaderData>;
    setHeaderItemWidth(width: number): void;
    intervalType: IntervalType;
}

const Header: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { headerData, setHeaderItemWidth, intervalType } = props;

    let itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef.current) {
            console.log("offsetwith", itemRef.current.offsetWidth);
            setHeaderItemWidth(itemRef.current.offsetWidth);
        }
    }, [itemRef, setHeaderItemWidth]);

    console.log("hereee", headerData);
    
    return (
        <div className="ct-header" id="ct-header-root">
            {intervalType === 'month' && headerData.map(header => {
                const year = header.headerDate.getFullYear();
                return (
                    <div key={year} className="ct-header__group">
                        <div className="ct-header__group__top">
                            {year}
                        </div>
                        <div className="ct-header__group__bottom">
                            {header.items.map(interval => {
                                const month = getMonthLabel(interval.getMonth());
                                return (
                                    <div
                                        key={`${year}-${month}`}
                                        ref={itemRef}
                                        className="ct-header__group__bottom__item"
                                    >
                                        {month}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            {intervalType === 'day' && headerData.map(header => {
                const month = getMonthLabel(header.headerDate.getMonth());
                return (
                    <div key={month} className="ct-header__group">
                        <div className="ct-header__group__top">
                            {month}
                        </div>
                        <div className="ct-header__group__bottom">
                            {header.items.map(interval => {
                                return (
                                    <div
                                        key={`${month}-${interval}`}
                                        ref={itemRef}
                                        className="ct-header__group__bottom__item"
                                    >
                                        {interval.getDate()}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Header;