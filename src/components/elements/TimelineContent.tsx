/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, Component } from 'react';
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
}

const initialState: OwnState = {
    isPrepared: false,
};

class TimelineContent extends Component<OwnProps, OwnState> {
    state = initialState;

    private mutationObserver: MutationObserver | null = null;

    componentDidMount() {
        const { groups } = this.props;
        if (groups.length < 0) return;

        const firstGroupSidebarItem = document.querySelector(`[data-sidebar-item="${groups[0].id}"]`);
        if (firstGroupSidebarItem) {
            this.setState({
                isPrepared: true,
            });
            return;
        }

        this.mutationObserver = new MutationObserver(() => {
            const firstGroupSidebarItem = document.querySelector(`[data-sidebar-item="${groups[0].id}"]`);
            if (firstGroupSidebarItem) {
                this.setState({
                    isPrepared: true,
                });
                this.removeObserver();
            }
        });

        this.mutationObserver.observe(document, { subtree: true, childList: true });
    }

    componentWillUnmount() {
        this.removeObserver();
    }

    removeObserver = () => {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }
    }

    renderMarkers = (markers: Array<Marker>) => {
        const { eventRenderer, headerItemWidth } = this.props;
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

    render() {
        const {
            markers, groups, headerItemWidth, columnsSize,
        } = this.props;

        return (
            <div className="ct-scroll">
                {groups.map((group: Group, idx: number) => {
                    const groupEvents = markers.filter(e => e.groupId === group.id);
                    const sidebarItem = document.querySelector(`[data-sidebar-item="${group.id}"]`);
                    let minHeight = 10;

                    console.log("has sidebar item", (!!sidebarItem));
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
                            {this.renderMarkers(groupEvents)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TimelineContent;
