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
    headerDate: Date;
    items: Array<Date>;
}

// todo adicionar codigo de cor ao evento
export interface EventItem {
    id: number | string;
    groupId: number | string;
    title: string;
    startPeriod: Date;
    endPeriod: Date;
    width?: number; // todo - isto é apenas para uso interno - talvez ter outra variavel
    left?: number;
    backgroundColor?: string;
}
