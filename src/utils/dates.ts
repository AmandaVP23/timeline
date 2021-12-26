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

export const getMonthLabel = (monthNbr: number): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNbr];
}