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
    renderGroupItem?(props: Object, group: Group): React.ReactNode;
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
                const props = {
                    className: `ct-sidebar-group-item ${groupsClass || ''}`,
                    'data-sidebar-item': group.id,
                }
                if (renderGroupItem) return renderGroupItem(props, group);
                return (
                    <div key={group.id} {...props}>
                        {group.title}
                    </div>
                );
            })}
        </div>
    );
}

export default Sidebar;