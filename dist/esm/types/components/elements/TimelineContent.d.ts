/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
import { Component } from 'react';
import { EventItem, Group, Marker } from '../../types/misc';
interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    markers: Array<Marker>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}
interface OwnState {
    isPrepared: boolean;
    groupElementHeight: number;
}
declare class TimelineContent extends Component<OwnProps, OwnState> {
    private mutationObserver;
    constructor(props: OwnProps);
    componentWillUnmount(): void;
    removeObserver: () => void;
    renderMarkers: (markers: Array<Marker>) => JSX.Element[];
    render(): JSX.Element;
}
export default TimelineContent;
