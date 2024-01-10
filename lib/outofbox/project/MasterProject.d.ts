import { Question } from '@serenity-js/core';
export declare const addMasterProject: {
    using: (masterProjectInfo: DataTable) => any;
};
export declare const fillMasterProjectFields: {
    using: (masterProjectInfo: DataTable) => any;
};
export declare const checkParentProjectField: {
    using: () => any;
};
export declare const deleteMasterProject: {
    using: (projectName: string | Question<any>) => any;
};
