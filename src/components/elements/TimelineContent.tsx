/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent } from 'react';
import { EventItem, Group } from '../../types/misc';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    events: Array<EventItem>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    events: Array<EventItem>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

const TimelineContent: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        events, groups, headerItemWidth, columnsSize, eventRenderer,
    } = props;

    const renderEvents = (events: Array<EventItem>) => {
        // todo - event renderer

        return events.map((event: EventItem, idx: number) => {
            // @ts-ignore
            const columnStart = (event.left / headerItemWidth) - 1;
            // @ts-ignore
            const columnEnd = columnStart + (event.width / headerItemWidth);

            let overlapPreviousEvent = false;
            if (idx > 0 && events.length > 1) {
                const previousEvent = events[idx - 1];
                const diff = event.startPeriod.getTime() - previousEvent.endPeriod.getTime();
                overlapPreviousEvent = diff < 0;
            }

            const style = {
                width: `${event.width}px`,
                marginLeft: `${event.left}px`,
                gridColumn: columnStart / columnEnd,
                backgroundColor: event.backgroundColor,
                gridRow: overlapPreviousEvent ? '2 / 3' : '1 / 2',
            };

            if (eventRenderer) return eventRenderer(event, style);

            return (
                <div
                    key={event.id}
                    className="ct-event"
                    style={style}
                >
                    {event.title}
                </div>
            );
        })
    }

    return (
        <div className="ct-scroll">
            {groups.map((group: Group, idx: number) => {
                const groupEvents = events.filter(e => e.groupId === group.id);
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
                        {renderEvents(groupEvents)}
                    </div>
                );
            })}
        </div>
    );
}

export default TimelineContent;