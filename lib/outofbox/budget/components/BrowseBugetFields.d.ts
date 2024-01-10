import { SearchFromFields } from '../../common/abstract';
export declare class BrowseBudgetFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 选择fiscal year
     * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
     * @param itemName 要选择的值
     * @returns
     */
    selectFiscalYearDropdownItem: (fieldName: string, itemName: string) => any;
    /**
     * Fiscal Year的两个搜索框
     * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
     * @returns
     */
    fiscalYearDropdownInputField: (fieldName: string) => any;
    fiscalYearDropdownBox: (fieldName: string) => any;
    fiscalYearDropdownList: (fieldName: string) => any;
    fiscalYearDropdownItem: (fieldName: string, itemName: string) => any;
    selectAllCheckBoxInBudgetGrid: () => any;
    deleteSelectedIcon: () => any;
}
export declare const browseBudget: BrowseBudgetFields;
