import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class SelectProjectsForFundFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    searchProject: (projectName: string | Question<any>) => any;
    addProjectToSelectedList: (projectName: string | Question<any>) => any;
    searchProjectInputfield: () => any;
    searchProjectIcon: () => any;
    unselectedProjectList: (projectName: string | Question<any>) => any;
    selectedProjectList: (projectName: string | Question<any>) => any;
    addProjectIcon: () => any;
    /**
     * 检查project fund数据表单元格的值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns
     */
    checkProjectFundAllocationTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    projectFundAllocationTable: () => any;
    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns
     */
    projectFundAllocationTableRow: (rowNumber: number) => any;
    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns
     */
    projectFundAllocationTableCell: (rowNumber: number, colNumber: number) => any;
}
export declare const selectProjectForFund: SelectProjectsForFundFields;
