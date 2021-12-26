/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useState } from 'react';
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
    const [headerHeight, setHeaderHeight] = useState(60);
    const [headerItemWidth, setHeaderItemWidth] = useState(60);

    useEffect(() => {
        const headerEl = document.getElementById('ct-header-root');
        if (headerEl) {
            console.log("height", headerEl.offsetHeight);
            setHeaderHeight(headerEl.offsetHeight);
        }
    }, [headerHeight, setHeaderHeight]);

    const headerData = calculateHeaderData(intervalType, startPeriod);
    let intervalsCounter = 0;
    Object.values(headerData).forEach(header => {
        intervalsCounter += header.items.length;
    });

    return (
        <div className="rt-wrapper">
            <Sidebar
                groups={groups}
                setSidebarWidth={width => setSidebarWidth(width)}
                renderGroupItem={renderGroupItem}
                headerHeight={headerHeight}
            />
            <div
                className="rt-container"
                style={{
                    marginLeft: `${sidebarWidth}px`,
                    width: `calc(100% - ${sidebarWidth}px)`,
                    maxWidth: `calc(100% - ${sidebarWidth}px)`,
                }}
            >
                <Header
                    headerData={headerData}
                    setHeaderItemWidth={width => setHeaderItemWidth(width)}
                />
                <Content
                    groupsSize={groups.length}
                    columnsSize={intervalsCounter}
                    headerItemWidth={headerItemWidth}
                />
            </div>
        </div>
    );
}

export default Timeline;
