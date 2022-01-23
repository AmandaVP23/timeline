/**
 *
 * @Copyright 2021 VOID SOFTWARE, S.A.
 *
 */

export const getDaysDiff = (start: Date, end: Date) => {
    const endTime = new Date(end).setHours(0, 0, 0, 0);
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    const diff = endTime - startTime;
    const hours = diff / (60 * 60 * 1000);
    return hours / 24;
}

export const getMonthsDiff = (start: Date, end: Date) => {
    const diffDays = getDaysDiff(start, end);
    return Math.trunc(diffDays / 30) + 1;
}

export const getMonthLabel = (monthNbr: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthNbr];
}
