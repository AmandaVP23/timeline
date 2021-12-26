/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useState } from 'react';
import Sidebar from '../Sidebar';
import { Group, IntervalType } from '../../types/misc';
import Header from './Header';
import Content from './TimelineContent';
import { calculateHeaderData } from '../../utils/header';

interface OwnProps {
    groups: Array<Group>;
    renderGroupItem?(group: Group): React.ReactNode;
    intervalType: IntervalType;
    startPeriod: Date;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        renderGroupItem,
        intervalType,
        startPeriod,
    } = props;

    const [sidebarWidth, setSidebarWidth] = useState(160);
    const [headerItemWidth, setHeaderItemWidth] = useState(60);

    const headerData = calculateHeaderData(intervalType, startPeriod);
    let intervalsCounter = 0;
    Object.values(headerData).forEach(header => {
        intervalsCounter += header.items.length;
    });

    return (
        <div className="rt-wrapper">
            <Header
                sidebarWidth={sidebarWidth}
                headerData={headerData}
                setHeaderItemWidth={width => setHeaderItemWidth(width)}
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
                    columnsSize={intervalsCounter}
                    headerItemWidth={headerItemWidth}
                />
            </div>
        </div>
    );
}

export default Timeline;
