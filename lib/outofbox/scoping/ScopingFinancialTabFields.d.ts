import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class ScopingFinancialTabFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /********************************** scoping Summary table **************************************** */
    /**
     * 给scoping数据表填值
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @param value 要填的值
     * @returns
     */
    fillScopingSummaryTableCell: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingSummaryTableCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingSummaryTableCellIsReadOnly: (rowNumber: number, colNumber: number) => any;
    /**
     * 选择scoping status选项
     * @param itemName 选项的值
     * @returns
     */
    selectScopingStatus: (itemName: string) => any;
    /**
     * 检查scoping status选项
     * @param itemName 选项的值
     * @returns
     */
    checkScopingStatus: (itemName: string) => any;
    /**
     * scoping 数据表的行
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @returns
     */
    scopingSummaryTableRow: (rowNumber: number) => any;
    /**
     * scoping 数据表的单元格
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @returns
     */
    scopingSummaryTableCell: (rowNumber: number, colNumber: number) => any;
    scopingStatusDropdownInputField: () => any;
    scopingStatusDropdownBox: () => any;
    scopingStatusDropdownItem: (itemName: string) => any;
    scopingTypeDropdownInputfield: () => any;
    scopingTypeDropdownBox: () => any;
    scopingTypeDropdownItem: (itemName: string) => any;
    /**
     * scoping 的类型
     * @param value 要选的值
     * @returns
     */
    selectScopingType: (value: string) => any;
    /*********************************** Scoping Detail table************************************ */
    /**
     * scoping Detail Project Cost数据表填值
     * @param rowNumber 第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @param value 要填的值
     * @returns
     */
    fillScopingDetailProjectCostTableCurrencyCell: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingDetailProjectCostTableCurrencyCellValue: (rowNumber: number, colNumber: number, value: string) => any;
    checkScopingDetailProjectCostTableFootCurrencyCellValue: (colNumber: number, value: string) => any;
    fillPhaseDropdownInputField: (rowNumber: number, colNumber: number, value: string) => any;
    /**
     * 在scoping Detail Project Cost数据表的fund弹窗中搜索目标fund
     * @param rowNumber 第一行为0，以此类推
     * @param value 要填的值
     * @returns
     */
    searchScopingDetailProjectCostTableFundInPopup: (rowNumber: number, value: string | Question<any>) => any;
    SyncButton: () => any;
    scopingDetailProjectCostTable: () => any;
    /**
     * scoping Detail Project Cost表的表头所在行
     * @returns
     */
    scopingDetailProjectCostTableHeadRow: () => any;
    /**
     * scoping Detail Project Cost表的表体的行
     * @param rowNumber 第一行为0，以此类推
     * @returns
     */
    scopingDetailProjectCostTableRow: (rowNumber: number) => any;
    /**
     * scoping Detail Project Cost表的表体的行
     * @param rowNumber 第一行为0，以此类推
     * @param colNumber 列序号，第一列为0，以此类推
     * @returns
     */
    scopingDetailProjectCostTableAttributeCell: (rowNumber: number, colNumber: any) => any;
    /**
     * scoping Detail Project Cost表的表体的填金额的列
     * @param rowNumber 第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns
     */
    scopingDetailProjectCostTableCurrencyCell: (rowNumber: number, colNumber: number) => any;
    scopingDetailProjectCostTableFootCurrencyCell: (colNumber: number) => any;
    scopingDetailProjectCostTableFundLookupIcon: (rowNumber: number) => any;
    scopingDetailProjectCostTableFundLookupPopup: () => any;
    syncButton: () => any;
    scopingDetailTab: (tabName: string) => any;
    scopingDetailProjectCostTableOptionCell: (rowNumber: number) => any;
    scopingDetailProjectCostTableOptionButton: (rowNumber: number, buttonName: string) => any;
    scopingDetailProjectCostTableAdjustButton: (rowNumber: number) => any;
    scopingDetailTableTopButton: (buttonName: string) => any;
    /************************* Promote Scoping Data As Budget ********************** */
    scopingBudgetDate: (fieldName: string) => any;
    fillScopingBudgetDate: (fieldName: string, value: string) => any;
    checkScopingBudgetDateValue: (fieldName: string, value: string) => any;
}
export declare const scopingFinancial: ScopingFinancialTabFields;
