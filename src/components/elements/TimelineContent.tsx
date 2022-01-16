/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { Component } from 'react';
import { EventItem, Group, Marker, MarkerPosition } from '../../types/misc';

interface OwnProps {
    groups: Array<Group>;
    columnsSize: number;
    headerItemWidth: number;
    markers: Array<Marker>;
    eventRenderer?(eventItem: EventItem, style: any): JSX.Element;
}

interface OwnState {
    isPrepared: boolean;
    columnsElements: Array<JSX.Element>;
    groupElementHeight: number;
}

const initialState: OwnState = {
    isPrepared: false,
    columnsElements: [],
    groupElementHeight: 30,
};

class TimelineContent extends Component<OwnProps, OwnState> {
    state = initialState;

    private mutationObserver: MutationObserver | null = null;

    constructor(props: OwnProps) {
        super(props);

        const { groups } = props;

        this.mutationObserver = new MutationObserver(() => {
            const firstGroupSidebarItem = document.querySelector(`[data-sidebar-item="${groups[0].id}"]`);
            if (firstGroupSidebarItem) {
                this.setState({
                    isPrepared: true,
                    groupElementHeight: firstGroupSidebarItem.getBoundingClientRect().height,
                });
                this.removeObserver();
            }
        });

        this.mutationObserver.observe(document, { subtree: true, childList: true });
    }

    componentDidMount() {
        const { groups, columnsSize, headerItemWidth } = this.props;
        if (groups.length < 0) return;

        const createColumns = () => {
            const columns = [];
            for (let index = 0; index < columnsSize; index++) {
                columns.push(
                    <div key={`col-${index}`} className="ct-scroll__column" style={{ width: `${headerItemWidth}px` }} />
                );
            }
            return columns;
        }

        this.setState({
            columnsElements: createColumns(),
        });

        // const firstGroupSidebarItem = document.querySelector(`[data-sidebar-item="${groups[0].id}"]`);
        // if (firstGroupSidebarItem) {
        //     this.setState({
        //         isPrepared: true,
        //         groupElementHeight: firstGroupSidebarItem.getBoundingClientRect().height,
        //     });
        //     return;
        // }
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
        const { eventRenderer } = this.props;
        const { groupElementHeight } = this.state;

        return markers.map(marker => {
            let style: any = {
                width: `${marker.width}px`,
                left: `${marker.left}px`,
                backgroundColor: marker.backgroundColor,
                height: marker.position === MarkerPosition.Full ? groupElementHeight : groupElementHeight / 2,
            };

            if (marker.position === MarkerPosition.Bottom) {
                style = { ...style, bottom: 0 };
            } else {
                style = { ...style, top: 0 };
            }

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
            markers, groups,
        } = this.props;
        const { isPrepared, columnsElements } = this.state;

        if (!isPrepared) return <div />;

        return (
            <div className="ct-scroll">
                {groups.map((group: Group, idx: number) => {
                    const groupEvents = markers.filter(e => e.groupId === group.id);
                    const sidebarItem = document.querySelector(`[data-sidebar-item="${group.id}"]`);
                    let minHeight = 20;

                    if (sidebarItem) {
                        minHeight = sidebarItem.getBoundingClientRect().height;
                    }

                    return (
                        <div
                            key={idx}
                            className="ct-scroll__line"
                            data-line-groupid={group.id}
                            style={{
                                minHeight: `${minHeight}px`,
                            }}
                        >
                            {columnsElements}
                            <div className="ct-scroll__line__events">
                                {this.renderMarkers(groupEvents)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TimelineContent;
