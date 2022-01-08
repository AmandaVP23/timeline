/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

import React, { FunctionComponent } from 'react';
import { Group } from '../types/misc';

interface OwnProps {
    groups: Array<Group>;
    groupsClass?: string;
    renderGroupItem?(group: Group): React.ReactNode;
}

const Sidebar: FunctionComponent<OwnProps> = (props: OwnProps) => {
    const {
        groups,
        groupsClass,
        renderGroupItem,
    } = props;

    return (
        <div className="ct-sidebar" id="ct-sidebar">
            {groups.map(group => {
                // todo - send props to renderGroupItem
                if (renderGroupItem) return renderGroupItem(group);

                console.log("id", group.id);

                return (
                    <div key={group.id} className={`ct-sidebar-group-item ${groupsClass || ''}`} data-sidebar-item={group.id}>
                        {group.title}
                    </div>
                );
            })}
        </div>
    );
}

export default Sidebar;