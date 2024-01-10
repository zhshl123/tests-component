import { Question } from '@serenity-js/core';
export declare const addFiltering: {
    using: (filteringInfo: DataTable) => any;
};
export declare const editFiltering: {
    using: (filteringInfo: DataTable) => any;
};
export declare const checkFiltering: {
    using: (Result: string) => any;
};
export declare const deleteFiltering: {
    using: () => any;
};
export declare const addWorkingFilteringPhase: {
    using: (filteringInfo: DataTable) => any;
};
export declare const addProjectInFilteringPhase: {
    using: (projectInfo: DataTable) => any;
};
export declare const checkFilteringProjectList: {
    using: (projectName: string | Question<any>, expectedResult: string) => any;
};
export declare const checkFilteringResult: {
    using: (fundingAvailability: any, projectName: string | Question<any>, expectedResult: string) => any;
};
export declare const dofilterInFilteringPhase: () => any;
export declare const syncFilteringResult: () => any;
export declare const checkFilteringResultDetail: {
    using: (filteringResultInfo: DataTable) => any;
};
export declare const checkFilteringSnapshotDetail: {
    using: (filteringResultInfo: DataTable) => any;
};
