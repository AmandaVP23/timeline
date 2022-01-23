/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useState } from 'react';
import Sidebar from './elements/Sidebar';
import { EventItem, Group, IntervalType } from '../types/misc';
import Header from './elements/Header';
import TimelineContent from './elements/TimelineContent';
import { calculateHeaderData } from '../utils/header';
import { populateMarkers } from '../utils/eventItems';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'react-perfect-scrollbar/dist/css/styles.css';

interface OwnProps {
    groups: Array<Group>;
    intervalType: IntervalType;
    startPeriod: Date;
    endPeriod?: Date;
    events: Array<EventItem>;
    renderGroupItem?(props: Object, group: Group): React.ReactNode;
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

    const [headerItemWidth, setHeaderItemWidth] = useState(60);

    const headerData = calculateHeaderData(intervalType, startPeriod, endPeriod);
    let intervalsCounter = 0;
    Object.values(headerData).forEach(header => {
        intervalsCounter += header.items.length;
    });

    const markers = populateMarkers(intervalType, headerData, events, headerItemWidth);

    return (
        <div className="rt-wrapper">
            <Sidebar
                groups={groups}
                renderGroupItem={renderGroupItem}
            />
            <PerfectScrollbar>
                <div className="rt-container">
                    <Header
                        headerData={headerData}
                        setHeaderItemWidth={width => setHeaderItemWidth(width)}
                        intervalType={intervalType}
                    />
                    <TimelineContent
                        groups={groups}
                        columnsSize={intervalsCounter}
                        headerItemWidth={headerItemWidth}
                        markers={markers}
                        eventRenderer={eventRenderer}
                    />
                </div>
            </PerfectScrollbar>
        </div>
    );
}

export default Timeline;
