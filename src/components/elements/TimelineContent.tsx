/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import { FunctionComponent } from 'react';
import { EventItem, Group } from '../../types/misc';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    events: Array<EventItem>;
}

const TimelineContent: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const { groups, columnsSize, headerItemWidth, events } = props;

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
                    <div className="ct-scroll__line__events" data-events-wrapper={groups[index].id}>
                        { renderEvents(groups[index].id) }
                    </div>
                </div>
            );
        }
        return lines;
    }

    const renderEvents = (groupId: number | string) => {
        const groupEvents = events.filter(e => e.groupId === groupId);
        const eventsEl = [];

        for (let index = 0; index < groupEvents.length; index++) {
            eventsEl.push(
                <div
                    className="ct-event"
                    style={{
                        width: `${groupEvents[index].width}px`,
                        marginLeft: `${groupEvents[index].left}px`,
                    }}
                >
                    {groupEvents[index].title}
                </div>
            )
        }

        if (eventsEl.length > 1) {
            const eventsWrapperEl: HTMLDivElement = document.querySelector(`[data-events-wrapper="${groupId}"]`) as HTMLDivElement;
            const lineEl: HTMLDivElement = document.querySelector(`[data-line-groupid="${groupId}"]`) as HTMLDivElement;
            const groupSidebarEl: HTMLDivElement = document.querySelector(`[data-sidebar-item="${groupId}"]`) as HTMLDivElement;
            if (eventsWrapperEl && lineEl) {
                lineEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
                groupSidebarEl.style.height = `${eventsWrapperEl.offsetHeight}px`;
            }
        }
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