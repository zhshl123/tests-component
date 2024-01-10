import { Question } from '@serenity-js/core';
import { SearchFromFields } from '../../common/abstract';
export declare class BrowseProjectFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 列表首行ID Link
     * @param rowNumber 第几行数据（第一行为0，以此类推）
     */
    IDLink: (rowNumber: number) => any;
    /**
     * 列表首行ID Link
     * @param rowNumber 第几行数据（第一行为0，以此类推）
     */
    IDExpandIcon: (rowNumber: number) => any;
    /**
     * 点击列表首行ID Link
     */
    clickIDLink: (rowNumber: number) => any;
    searchAndEditImplementationProject: (projectName: string | Question<any>) => any;
    openPlanningProjectInBrowseImplementationProject: (projectName: string | Question<any>) => any;
    searchAndEditPlanningProject: (projectName: string | Question<any>) => any;
}
export declare const browseProject: BrowseProjectFields;
