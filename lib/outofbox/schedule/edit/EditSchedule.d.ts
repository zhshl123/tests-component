import { Question } from '@serenity-js/core';
export declare const checkscheduleList: {
    using: (scheduleName: string | Question<any>) => any;
};
export declare const copySchedule: {
    using: (scheduleName: string | Question<any>) => any;
};
export declare const checkCopiedSchedule: {
    using: (scheduleInfo: DataTable) => any;
};
export declare const deleteSchedule: () => any;
export declare const checkScheduleName: {
    using: (scheduleName: string | Question<any>) => any;
};
export declare const openGanttChartPage: {
    using: (scheduleName: string | Question<any>) => any;
};
export declare const addMultiScheduleTask: {
    using: (taskInfo: Record<string, string>[]) => any;
};
export declare const fillTaskGeneralInfo: {
    using: (taskInfo: Record<string, string>) => any;
};
export declare const fillTaskResourceInfo: {
    using: (taskInfo: Record<string, string>) => any;
};
export declare const checkMultiScheduleTask: {
    using: (taskInfo: Record<string, string>[]) => any;
};
export declare const checkTaskReouceValue: {
    using: (taskInfo: Record<string, string>) => any;
};
export declare const deleteMultiTask: {
    using: (taskInfo: Record<string, string>[]) => any;
};
