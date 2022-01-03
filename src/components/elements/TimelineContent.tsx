/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

 import { FunctionComponent } from 'react';
 
interface OwnProps {
    sidebarWidth: number;
    groupsSize: number;
    columnsSize: number;
    children: React.ReactElement;
    colWidth: number;
 }
 
const Content: FunctionComponent<OwnProps> = (props: OwnProps) => {
const {sidebarWidth, groupsSize, columnsSize, colWidth} = props;

const renderColumns = () => {
    const columns = [];
    for (let index = 0; index < columnsSize; index++) {
        columns.push(
            <div key={`col-${index}`} className="ct-scroll__column" style={{ width: `${colWidth}%` }} />
        );
    }
    return columns;
}

const renderLinesAndColumns = () => {
    const lines = [];
    for (let index = 0; index < groupsSize; index++) {
        lines.push(
                <div className="ct-scroll__line" key={`line-${index}`}>
                    { renderColumns() }
                { index + 1 === props.children.props.line ? props.children : undefined }
                </div>
        );
    }
    return lines;
}
return (
    <div className="ct-scroll" style={{
        width: `calc(100% - ${sidebarWidth}px)`
    }}>
        { renderLinesAndColumns() }
    </div>
);
}

export default Content;