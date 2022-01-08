/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent } from 'react';
import { EventItem, Group, Marker } from '../../types/misc';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    markers: Array<Marker>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

const TimelineContent: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        markers, groups, headerItemWidth, columnsSize, eventRenderer,
    } = props;

    const renderMarkers = (markers: Array<Marker>) => {
        return markers.map(marker => {
            // @ts-ignore
            const columnStart = (marker.left / headerItemWidth) - 1;
            // @ts-ignore
            const columnEnd = columnStart + (marker.width / headerItemWidth);
            const style = {
                width: `${marker.width}px`,
                marginLeft: `${marker.left}px`,
                gridColumn: columnStart / columnEnd,
                backgroundColor: marker.backgroundColor,
                gridRow: marker.gridRow,
            };

            if (eventRenderer) return eventRenderer(marker, style);

            return (
                <div
                    key={marker.id}
                    className="ct-event"
                    style={style}
                >
                    {marker.title}
                </div>
            );
        })
    }

    return (
        <div className="ct-scroll">
            {groups.map((group: Group, idx: number) => {
                const groupEvents = markers.filter(e => e.groupId === group.id);
                const sidebarItem = document.querySelector(`[data-sidebar-item="${group.id}"]`);
                let minHeight = 10;

                if (sidebarItem) {
                    minHeight = sidebarItem.getBoundingClientRect().height;
                }

                return (
                    <div
                        key={idx}
                        className="ct-scroll__line"
                        data-line-groupid={group.id}
                        style={{
                            gridTemplateColumns: `repeat(${columnsSize}, ${headerItemWidth}px)`,
                            minHeight: `${minHeight}px`,
                        }}
                    >
                        {renderMarkers(groupEvents)}
                    </div>
                );
            })}
        </div>
    );
}

export default TimelineContent;