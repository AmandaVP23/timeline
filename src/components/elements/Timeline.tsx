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
    days: Array<string>;
    colWidth: number;
}

const Timeline: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { groups, days, colWidth } = props;

    const [sidebarWidth, setSidebarWidth] = useState(160);

    const today = "September, 2021";
    
    return (
        <div className="rt-wrapper">
            <Header
                sidebarWidth={sidebarWidth}
                labelFormat={today}
                headerData={days}
                colWidth={colWidth}
            />
            <div className="rt-outer">
                <Sidebar
                    groups={groups}
                    setSidebarWidth={width => setSidebarWidth(width)}
                />
                <Content
                    sidebarWidth={sidebarWidth}
                    groupsSize={groups.length}
                    columnsSize={days.length}
                    colWidth={colWidth}
                >
                    <Marker colWidth={colWidth} line={2} start={26} end={30} days={days} />
                </Content>
            </div>
        </div>
    );
}

interface markerProps {
    line: number;
    start: number;
    end: number;
    days: Array<string>;
    colWidth: number;
}

const Marker: FunctionComponent<markerProps> = (props: markerProps) => {
    const markerWidth = (props.colWidth * (props.end - props.start)) + props.colWidth % 1;
    const markerPosition = (props.start - 1 ) * (Math.floor(props.colWidth)) + (props.colWidth % 1);
    return (
        <div style={{
            width: `${markerWidth}%`,
            backgroundColor: 'red',
            position: 'absolute',
            left: `calc(200px + ${markerPosition}%)`,
        }} >marker 1</div>
    )
}

export default Timeline;
