/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useState } from 'react';
import Sidebar from '../Sidebar';
import { Group } from '../../types/misc';
import Header from './Header';

interface OwnProps {
    groups: Array<Group>;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { groups } = props;

    const [sidebarWidth, setSidebarWidth] = useState(160);

    return (
        <div className="rt-wrapper">
            <Header
                sidebarWidth={sidebarWidth}
            />
            <Sidebar
                groups={groups}
                setSidebarWidth={width => setSidebarWidth(width)}
            />
        </div>
    );
}

export default Timeline;
