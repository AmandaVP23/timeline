/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent } from 'react';

interface OwnProps {
    sidebarWidth: number;
}

const Header: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { sidebarWidth } = props;

    return (
        <div className="ct-header">
            <div style={{ width: `${sidebarWidth}px` }} />
            <div>header</div>
        </div>
    );
}

export default Header;