/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

export interface Group {
    id: number | string;
    title: string;
}

export type IntervalType = 'day' | 'week' | 'month';

export interface HeaderData {
    label: string;
    items: Array<string>;
}
