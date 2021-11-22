/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useState } from 'react';
import Sidebar from '../Sidebar';
import { Group } from '../../types/misc';
import Header from './Header';
import Content from './TimelineContent';

interface OwnProps {
    groups: Array<Group>;
    renderGroupItem?(group: Group): React.ReactNode;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        renderGroupItem,
    } = props;

    const [sidebarWidth, setSidebarWidth] = useState(160);

    const today = new Date();
    const dayHours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00'] 

    return (
        <div className="rt-wrapper">
            <Header
                sidebarWidth={sidebarWidth}
                labelFormat={today.toLocaleDateString()}
                headerData={dayHours}
            />
            <div className="rt-outer">
                <Sidebar
                    groups={groups}
                    setSidebarWidth={width => setSidebarWidth(width)}
                    renderGroupItem={renderGroupItem}
                />
                <Content
                    sidebarWidth={sidebarWidth}
                    groupsSize={groups.length}
                    columnsSize={dayHours.length}
                />
            </div>
        </div>
    );
}

export default Timeline;
