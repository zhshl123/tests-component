import { Question } from '@serenity-js/core';
export declare const updateProjectGeneralInfo: {
    using: (projectInfo: DataTable) => any;
};
export declare const checkUpdatedProjectGeneralInfo: {
    using: (projectInfo: DataTable) => any;
};
export declare const deleteProject: {
    using: (projectName: string | Question<any>) => any;
};
export declare const closeoutProject: {
    using: (projectName: string | Question<any>) => any;
};
export declare const openProject: () => any;
