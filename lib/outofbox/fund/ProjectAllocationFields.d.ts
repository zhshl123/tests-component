import { EditFromFields } from '../common/abstract';
export declare class ProjectAllocationFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 给fund allocation表格填值
     * @param rowNumber 行号，第一行为0， 以此类推
     * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
     * @param value 要填的值
     * @returns
     */
    fillFundAllocationTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 检查Fund Ending Balance 表格中的数据
     * @param colNumber 列序号 第一列为0， 以此类推
     * @param value 要检查的值
     * @returns
     */
    checkFundEndingBalanceCellValue: (colNumber: number, value: string) => any;
    /**
     * 检查Fund Ending Balance 表格中的数据的颜色
     * @param colNumber 列序号 第一列为0， 以此类推
     * @param value 要检查的值
     * @returns
     */
    checkFundEndingBalanceCellColor: (colNumber: number, value: string) => any;
    /**
     * 检查Fund allocation 表格中的数据
     * @param rowNumber 行号，第一行为0，以此类推
     * @param colNumber 列序号 不含首列，第一列为0， 以此类推
     * @param value 要检查的值
     * @returns
     */
    checkFundAllocationDetailTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 检查Fund allocation 表格中的数据的颜色
     * @param rowNumber 行号，第一行为0，以此类推
     * @param colNumber 列序号 不含首列，第一列为0， 以此类推
     * @param value 要检查的值
     * @returns
     */
    checkFundAllocationDetailTableCellColor: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 鼠标悬停在fund上面
     * @returns
     */
    hoverOverFund: () => any;
    /**********************鼠标悬停fund后出来的数据表********************* */
    fundEndingBalancePanel: () => any;
    fundEndingBalanceTableBodyRow: () => any;
    /**
     * Fund Ending Balance的单元格
     * @param colNumber 列序号，不含首列，第一列为0 ，以此类推
     * @returns
     */
    fundEndingBalanceTableCell: (colNumber: number) => any;
    /****************** fund Allocation Detail ***************** */
    fundAllocationDetailTable: () => any;
    /**
     * fund alloaction数据表的行
     * @param rowNumber 行号，第一行为0， 以此类推
     * @returns
     */
    fundAllocationRDetailTableRow: (rowNumber: number) => any;
    /**
     * fund alloaction数据表的行首列
     * @param rowNumber 行号，第一行为0， 以此类推
     * @returns
     */
    fundAllocationRDetailTableRowHeadColumn: (rowNumber: number) => any;
    /**
     * fund alloaction数据表的单元格
     * @param rowNumber 行号，第一行为0， 以此类推
     * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
     * @returns
     */
    fundAllocationDetailTableCell: (rowNumber: number, colNumber: number) => any;
}
export declare const projectAllocation: ProjectAllocationFields;
