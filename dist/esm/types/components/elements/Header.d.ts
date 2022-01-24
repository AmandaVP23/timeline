/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
import { FunctionComponent } from 'react';
import { HeaderData, IntervalType } from '../../types/misc';
interface OwnProps {
    headerData: Array<HeaderData>;
    setHeaderItemWidth(width: number): void;
    intervalType: IntervalType;
}
declare const Header: FunctionComponent<OwnProps>;
export default Header;
