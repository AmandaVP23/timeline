/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { EventItem, Group, IntervalType } from '../../types/misc';
import Header from './Header';
import TimelineContent from './TimelineContent';
import { calculateHeaderData } from '../../utils/header';
import { populateEventsWidth } from '../../utils/eventItems';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ScrollBar from 'react-perfect-scrollbar';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface OwnProps {
    groups: Array<Group>;
    renderGroupItem?(group: Group): React.ReactNode;
    intervalType: IntervalType;
    startPeriod: Date;
    endPeriod?: Date;
    events: Array<EventItem>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        renderGroupItem,
        intervalType,
        startPeriod,
        events,
        eventRenderer,
        endPeriod,
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

    const headerData = calculateHeaderData(intervalType, startPeriod, endPeriod);
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
            <PerfectScrollbar>
                <div className="rt-container">
                    <Header
                        headerData={headerData}
                        setHeaderItemWidth={width => setHeaderItemWidth(width)}
                    />
                    <TimelineContent
                        groups={groups}
                        columnsSize={intervalsCounter}
                        headerItemWidth={headerItemWidth}
                        events={eventsWithWidth}
                        eventRenderer={eventRenderer}
                    />
                </div>
            </PerfectScrollbar>
        </div>
    );
}

export default Timeline;
