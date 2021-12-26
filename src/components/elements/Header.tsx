/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useRef } from 'react';
import { HeaderData } from '../../types/misc';

interface OwnProps {
    sidebarWidth: number;
    headerData: Array<HeaderData>;
    setHeaderItemWidth(width: number): void;
}

const Header: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { sidebarWidth, headerData, setHeaderItemWidth } = props;

    let itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (itemRef.current) {
            setHeaderItemWidth(itemRef.current.offsetWidth);
        }
    }, [itemRef, setHeaderItemWidth])
    
    return (
        <div className="ct-header" style={{
            marginLeft: `${sidebarWidth}px`,
            width: `calc(100% - ${sidebarWidth}px)`
        }}>
            {headerData.map(header => {
                return (
                    <div key={header.label} className="ct-header__group">
                        <div className="ct-header__group__top">
                            {header.label}
                        </div>
                        <div className="ct-header__group__bottom">
                            {header.items.map(interval => {
                                return (
                                    <div
                                        key={interval}
                                        ref={itemRef}
                                        className="ct-header__group__bottom__item"
                                    >
                                        {interval}
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