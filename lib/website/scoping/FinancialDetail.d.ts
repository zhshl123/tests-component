import { Question } from '@serenity-js/core';
import { LineItemFields } from '../common/abstract';
export declare class EditFinancialDetail extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
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
    scopingDetailProjectCostTableFundLookupInputField: (rowNumber: number) => any;
    syncButton: () => any;
    scopingDetailTab: (tabName: string) => any;
    scopingDetailProjectCostTableOptionCell: (rowNumber: number) => any;
    scopingDetailProjectCostTableOptionButton: (rowNumber: number, buttonName: string) => any;
    scopingDetailProjectCostTableAdjustButton: (rowNumber: number) => any;
    scopingDetailTableTopButton: (buttonName: string) => any;
}
export declare const financialDetail: EditFinancialDetail;
