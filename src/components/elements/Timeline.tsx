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

    let previousCol = 0;
    let itemPreviousCol = 0;

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
                    gridTemplateColumns: `repeat(${intervalsCounter}, auto-fit)`,
                    //marginLeft: `${sidebarWidth}px`,
                    //width: `calc(100% - ${sidebarWidth}px)`,
                    //maxWidth: `calc(100% - ${sidebarWidth}px)`,
                }}
            >
                {headerData.map((h, idx) => {
                    const startCol = previousCol + 1;
                    const endCol = startCol + h.items.length;
                    previousCol = endCol;

                    console.log("start", startCol, "end", endCol, "previos", previousCol);

                    return (
                        <div
                            key={idx}
                            className="ct-header-top"
                            style={{
                                //gridColumn: startCol / endCol,
                                gridColumnStart: startCol,
                                gridColumnEnd: endCol,
                                //gridColumn: idx === 1 ? 5 / 9 : 1 / 4,
                                //gridRow: 1 / 2,
                                //backgroundColor: '#121212',
                            }}
                        >
                            header 1
                        </div>
                    )
                })}
                {headerData.map((h, lineIdx) => {

                    return h.items.map((i, itemIdx) => {
                        const startCol = itemPreviousCol + 1;
                        //const endCol = startCol + 1;
                        itemPreviousCol = startCol + 1;

                        console.log("-----");
                        console.log("start", startCol, "end",startCol + 1,  "previos", itemPreviousCol);

                        return (
                            <div key={itemIdx}
                                 style={{
                                     gridColumnStart: startCol,
                                     gridColumnEnd: startCol + 1,
                                     gridRow: 3 / 4,
                                     minWidth: '40px',
                                 }}
                            >
                                i
                            </div>
                        )
                    })
                })}
                {/*<Header*/}
                {/*    headerData={headerData}*/}
                {/*    setHeaderItemWidth={width => setHeaderItemWidth(width)}*/}
                {/*/>*/}
                <TimelineContent
                    groups={groups}
                    columnsSize={intervalsCounter}
                    headerItemWidth={headerItemWidth}
                    events={eventsWithWidth}
                    eventRenderer={eventRenderer}
                />
            </div>
        </div>
    );
}

export default Timeline;
