import { Question } from '@serenity-js/core';
/**
 * 切换tab
 * @returns
 */
export declare const clickContractTab: {
    using: (tabName: any) => any;
};
/**
 * line items tab
 * @returns
 */
export declare const clickContractLineItemsTab: () => any;
/**
 * splitting line items tab
 * @returns
 */
export declare const clickContractSplittingLineItemsTab: () => any;
export declare const changeContractStatus: {
    using: (targetStatus: string) => any;
};
export declare const checkContractReadOnlyContract: () => any;
export declare const updateContractGeneralInfo: {
    using: (contractInfo: DataTable, updatedContractName: string) => any;
};
export declare const checkUpdatedContractGeneralInfo: {
    using: (contractInfo: DataTable) => any;
};
export declare const deleteContract: {
    using: (contractNo: string | Question<any>) => any;
};
/**
 * Edit contract 的General 组件
 */
export declare class ContractGeneralInfo {
    static contractTabPanel: () => any;
    static contractTab: (tabName: string) => any;
    static contractLineItemsTab: () => any;
    static contractSplittingLineItemsTab: () => any;
    static contractStatusDropdownField: () => any;
    static contractStatusDropdownListBox: () => any;
    static contractStatus: (statusName: string) => any;
    static startDateInputField: () => any;
    static startDateCalendarIcon: () => any;
    static endDateInputField: () => any;
    static endDateCalendarIcon: () => any;
}
