/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent } from 'react';

interface OwnProps {
    sidebarWidth: number;
    labelFormat: string;
    headerData: Array<string>;

}

const Header: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { sidebarWidth, labelFormat, headerData } = props;
    
    return (
        <div className="ct-header" style={
            {
                marginLeft: `${sidebarWidth}px`,
                width: `calc(100% - ${sidebarWidth}px)`
            }
        }>
            
            <div className="ct-header__day">{labelFormat}</div>
            
            <div className="ct-header__hour-view-wrapper">
                {
                headerData.map(hour => {
                    return <div key={hour} className="ct-header__hour-view-wrapper__hour" style={{ width: `${100 / headerData.length}%` }}> {hour} </div>;
                })
            }
            </div>
        </div>
    );
}

export default Header;