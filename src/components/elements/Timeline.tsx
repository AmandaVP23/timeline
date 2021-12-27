/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { EventItem, Group, IntervalType } from '../../types/misc';
import Header from './Header';
import Content from './TimelineContent';
import { calculateHeaderData } from '../../utils/header';
import { populateEventsWidth } from '../../utils/eventItems';

interface OwnProps {
    groups: Array<Group>;
    renderGroupItem?(group: Group): React.ReactNode;
    intervalType: IntervalType;
    startPeriod: Date;
    events: Array<EventItem>;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        renderGroupItem,
        intervalType,
        startPeriod,
        events,
    } = props;

    const [sidebarWidth, setSidebarWidth] = useState(160);
    const [headerHeight, setHeaderHeight] = useState(60);
    const [headerItemWidth, setHeaderItemWidth] = useState(60);

    useEffect(() => {
        const headerEl = document.getElementById('ct-header-root');
        if (headerEl) {
            setHeaderHeight(headerEl.offsetHeight);
        }
    }, [headerHeight, setHeaderHeight]);

    const headerData = calculateHeaderData(intervalType, startPeriod);
    let intervalsCounter = 0;
    Object.values(headerData).forEach(header => {
        intervalsCounter += header.items.length;
    });

    const eventsWithWidth = populateEventsWidth(headerData, events, headerItemWidth);

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
                    groups={groups}
                    columnsSize={intervalsCounter}
                    headerItemWidth={headerItemWidth}
                    events={eventsWithWidth}
                />
            </div>
        </div>
    );
}

export default Timeline;
