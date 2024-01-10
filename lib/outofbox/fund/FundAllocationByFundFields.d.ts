import { EditFromFields } from '../common/abstract';
export declare class FundAllocationByFundFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 检查project fund数据表的单元格的值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns
     */
    checkProjectFundAllocationTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 给project fund数据表的单元格填值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns
     */
    fillProjectFundAllocationTableCell: (rowNumber: number, colNumber: number, value: string) => any;
    projectFundAllocationTable: () => any;
    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns
     */
    projectFundAllocationTableRow: (rowNumber: number) => any;
    /**
     * project fund数据表的行首列
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns
     */
    projectFundAllocationTableHeadColumn: (rowNumber: number) => any;
    /**
     * project fund数据表的单元格
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns
     */
    projectFundAllocationTableCell: (rowNumber: number, colNumber: number) => any;
    saveButton: () => any;
    /************************鼠标悬停到project上的弹窗****************************** */
    /**
     * 检查additional Fund Needed数据表的单元格的值
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns
     */
    checkAdditionalFundNeededTableCellValue: (colNumber: number, value: string) => any;
    additionalFundNeededTable: () => any;
    /**
     * additional Fund Needed数据表的行
     * @returns
     */
    additionalFundNeededTableBodyRow: () => any;
    /**
     * additional Fund Needed数据表的单元格
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns
     */
    projectFundAllocationTableBodyCell: (colNumber: number) => any;
}
export declare const fundAllocationByFund: FundAllocationByFundFields;
