/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
import React, { FunctionComponent } from 'react';
import { EventItem, Group, IntervalType } from '../types/misc';
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
declare const Timeline: FunctionComponent<OwnProps>;
export default Timeline;
