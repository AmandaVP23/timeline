/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
import React, { FunctionComponent } from 'react';
import { Group } from '../../types/misc';
interface OwnProps {
    groups: Array<Group>;
    groupsClass?: string;
    renderGroupItem?(props: Object, group: Group): React.ReactNode;
}
declare const Sidebar: FunctionComponent<OwnProps>;
export default Sidebar;
