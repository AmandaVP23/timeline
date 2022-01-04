/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { Component } from 'react';
import { EventItem, Group } from '../../types/misc';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    events: Array<EventItem>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

class TimelineContent extends Component<OwnProps> {
    renderColumns = () => {
        const { columnsSize, headerItemWidth } = this.props;
        const columns = [];
        for (let index = 0; index < columnsSize; index++) {
            columns.push(
                <div key={`col-${index}`} className="ct-scroll__column" style={{ width: `${headerItemWidth}px` }} />
            );
        }
        return columns;
    }

    renderEvents = (events: Array<EventItem>) => {
        // todo - event renderer

        return events.map((event: EventItem, idx: number) => {
            const { groupId } = event;
            const style = {
                width: `${event.width}px`,
                marginLeft: `${event.left}px`,
            };

            let overlapPreviousEvent = false;
            if (idx > 0 && events.length > 1) {
                const previousEvent = events[idx - 1];
                console.log(previousEvent);
                const diff = event.startPeriod.getTime() - previousEvent.endPeriod.getTime();
                console.log("----", diff);
                overlapPreviousEvent = diff < 0;
            }

            if (overlapPreviousEvent) {
                const eventsWrapperEl: HTMLDivElement = document.querySelector(`[data-events-wrapper="${groupId}"]`) as HTMLDivElement;
                const lineEl: HTMLDivElement = document.querySelector(`[data-line-groupid="${groupId}"]`) as HTMLDivElement;
                const groupSidebarEl: HTMLDivElement = document.querySelector(`[data-sidebar-item="${groupId}"]`) as HTMLDivElement;
                if (eventsWrapperEl && lineEl) {
                    lineEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
                    groupSidebarEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
                }
            }

            return (
                <div
                    key={event.id}
                    className="ct-event"
                    style={{
                        ...style,
                        backgroundColor: event.backgroundColor,
                        top: overlapPreviousEvent ? '20px' : '0px',
                    }}
                >
                    {event.title}
                </div>
            );
        })
    }

    render() {
        const { groups, events } = this.props;

        return (
            <div className="ct-scroll">
                {groups.map((group: Group, idx: number) => {
                    const groupEvents = events.filter(e => e.groupId === group.id);
                    return (
                        <div key={idx} className="ct-scroll__line" data-line-groupid={group.id}>
                            {this.renderColumns()}
                            <div className="ct-scroll__line__events" data-events-wrapper={group.id}>
                                {this.renderEvents(groupEvents)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TimelineContent;

/*
import { FunctionComponent } from 'react';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    events: Array<EventItem>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

const TimelineContent: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups, columnsSize, headerItemWidth, events, eventRenderer,
    } = props;

    const renderColumns = () => {
        const columns = [];
        for (let index = 0; index < columnsSize; index++) {
            columns.push(
                <div key={`col-${index}`} className="ct-scroll__column" style={{ width: `${headerItemWidth}px` }} />
            );
        }
        return columns;
    }

    const renderLinesAndColumns = () => {
        const lines = [];
        for (let index = 0; index < groups.length; index++) {
            lines.push(
                <div className="ct-scroll__line" key={`line-${index}`} data-line-groupid={groups[index].id}>
                    { renderColumns() }
                    { renderEvents(groups[index].id) }
                </div>
            );
        }
        return lines;
    }

    const renderEvents = (groupId: number | string) => {
        const groupEvents = events.filter(e => e.groupId === groupId);
        const eventsEl = [];

        for (let index = 0; index < groupEvents.length; index++) {
            const style = {
                width: `${groupEvents[index].width}px`,
                marginLeft: `${groupEvents[index].left}px`,
            };
            if (eventRenderer) {
                eventsEl.push(eventRenderer(groupEvents[index], style));
            } else {
                eventsEl.push(
                    <div
                        className="ct-event"
                        style={{
                            ...style,
                            backgroundColor: groupEvents[index].backgroundColor,
                        }}
                    >
                        {groupEvents[index].title}
                    </div>
                )
            }
        }

        // if (eventsEl.length > 1) {
        //     const eventsWrapperEl: HTMLDivElement = document.querySelector(`[data-events-wrapper="${groupId}"]`) as HTMLDivElement;
        //     const lineEl: HTMLDivElement = document.querySelector(`[data-line-groupid="${groupId}"]`) as HTMLDivElement;
        //     const groupSidebarEl: HTMLDivElement = document.querySelector(`[data-sidebar-item="${groupId}"]`) as HTMLDivElement;
        //     if (eventsWrapperEl && lineEl) {
        //         lineEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
        //         groupSidebarEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
        //     }
        // }
        return eventsEl;
    }

    return (
        <div className="ct-scroll" style={{
            //width: `calc(100% - ${sidebarWidth}px)`
        }}>
            { renderLinesAndColumns()}
        </div>
    );
}

export default TimelineContent;
*/
