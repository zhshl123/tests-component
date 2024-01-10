import { Question } from '@serenity-js/core';
/**
 * 添加project
 */
export declare const addProject: {
    using: (projectInfo: DataTable) => any;
};
export declare const addPlanningProject: {
    using: (projectInfo: DataTable) => any;
};
export declare const addApprovedPlanningProject: {
    using: (projectInfo: DataTable) => any;
};
export declare const fillProjectFields: {
    using: (projectInfo: DataTable) => any;
};
/**
 * 添加approved的project
 */
export declare const addApprovedProject: {
    using: (projectName: string) => any;
};
/**
 * 添加project
 */
export declare const addApprovedProjectAndProjectScoping: {
    using: (projectInfo: DataTable) => any;
};
export declare const addProjectWithDynamicScenario: {
    using: (projectInfo: DataTable) => any;
};
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
export declare const assignPlanningProjectManager: {
    using: (username: string) => any;
};
export declare const checkApprovedPlanningProject: () => any;
export declare const selectBatchApprovalProject: {
    using: (buttonName: string) => any;
};
export declare const confirmBatchApprovalProject: () => any;
export declare const changeProjectStatus: {
    using: (status: string) => any;
};
