/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useRef } from 'react';
import { HeaderData } from '../../types/misc';
import { getMonthLabel } from '../../utils/dates';

interface OwnProps {
    headerData: Array<HeaderData>;
    setHeaderItemWidth(width: number): void;
}

const Header: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { headerData, setHeaderItemWidth } = props;

    let itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef.current) {
            setHeaderItemWidth(itemRef.current.offsetWidth);
        }
    }, [itemRef, setHeaderItemWidth])

    
    return (
        <div className="ct-header" id="ct-header-root">
            {headerData.map(header => {
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