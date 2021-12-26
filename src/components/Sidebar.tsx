/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Group } from '../types/misc';

interface OwnProps {
    groups: Array<Group>;
    groupsClass?: string;
    setSidebarWidth(width: number): void;
    renderGroupItem?(group: Group): React.ReactNode;
    headerHeight: number;
}

const Sidebar: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        groupsClass,
        setSidebarWidth,
        renderGroupItem,
        headerHeight,
    } = props;

    let sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(sidebarRef.current.offsetWidth);
        }
    }, [sidebarRef, setSidebarWidth])

    return (
        <div className="ct-sidebar" id="ct-sidebar" ref={sidebarRef} style={{ top: `${headerHeight}px` }}>
            {groups.map(group => {
                if (renderGroupItem) return renderGroupItem(group);

                return (
                    <div key={group.id} className={`ct-sidebar-group-item ${groupsClass || ''}`}>
                        {group.title}
                    </div>
                );
            })}
        </div>
    );
}

export default Sidebar;