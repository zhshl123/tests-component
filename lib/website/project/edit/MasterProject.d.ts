import { Question } from '@serenity-js/core';
export declare const addMasterProject: {
    using: (masterProjectInfo: DataTable) => any;
};
export declare const fillMasterProjectRequiredFields: {
    using: (Project: string, Department: string, Program: string, Currency: string) => any;
};
export declare const checkParentProjectField: {
    using: () => any;
};
export declare const deleteMasterProject: {
    using: (projectName: string | Question<any>) => any;
};
