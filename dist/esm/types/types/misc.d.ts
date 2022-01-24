/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */
export interface Group {
    id: number | string;
    title: string;
}
export declare type IntervalType = 'day' | 'week' | 'month';
export interface HeaderData {
    headerDate: Date;
    items: Array<Date>;
}
export interface EventItem {
    id: number | string;
    groupId: number | string;
    title: string;
    startPeriod: Date;
    endPeriod: Date;
    backgroundColor?: string;
}
export declare enum MarkerPosition {
    Top = "top",
    Bottom = "bottom",
    Full = "full"
}
export interface Marker {
    id: number | string;
    groupId: number | string;
    title: string;
    startPeriod: Date;
    endPeriod: Date;
    width: number;
    left: number;
    backgroundColor?: string;
    position: MarkerPosition;
}
