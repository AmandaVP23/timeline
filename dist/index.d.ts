import React, { FunctionComponent } from 'react';

/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
interface Group {
    id: number | string;
    title: string;
}
declare type IntervalType = 'day' | 'week' | 'month';
interface HeaderData {
    headerDate: Date;
    items: Array<Date>;
}
interface EventItem {
    id: number | string;
    groupId: number | string;
    title: string;
    startPeriod: Date;
    endPeriod: Date;
    backgroundColor?: string;
}
declare enum MarkerPosition {
    Top = "top",
    Bottom = "bottom",
    Full = "full"
}
interface Marker {
    id: number | string;
    groupId: number | string;
    title: string;
    startPeriod: Date;
    endPeriod: Date;
    width: number;
    left: number;
    backgroundColor?: string;
    position: MarkerPosition;
}

/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

interface OwnProps {
    groups: Array<Group>;
    intervalType: IntervalType;
    startPeriod: Date;
    endPeriod?: Date;
    events: Array<EventItem>;
    renderGroupItem?(props: Object, group: Group): React.ReactNode;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}
declare const Timeline: FunctionComponent<OwnProps>;

export { EventItem, Group, HeaderData, IntervalType, Marker, MarkerPosition, Timeline };
