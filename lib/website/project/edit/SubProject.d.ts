import { Question } from '@serenity-js/core';
export declare const addSubProject: {
    using: (subProjectInfo: DataTable) => any;
};
export declare const fillSubProjectRequiredFields: {
    using: (Project: string, Department: string, Program: string, Currency: string) => any;
};
export declare const checkSubProject: {
    using: (projectName: string | Question<any>) => any;
};
export declare const deleteSubProject: {
    using: (projectName: string | Question<any>) => any;
};
export declare const checkDeletedSubProject: {
    using: (projectName: string | Question<any>, subProjectName: string | Question<any>) => any;
};
