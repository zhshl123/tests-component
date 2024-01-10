/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
export declare const addContractLineItem: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const checkContractPaidExpense: () => any;
export declare const addMultiContractLineitems: {
    using: (lineItemsInfo: DataTable) => any;
};
/**
 * 检查多行line item
 */
export declare const checkMultiContractLineItems: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
/**
 * 检查单条line item
 */
export declare const checkContractLineItem: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
export declare const updateMultiContractLineItems: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const deleteMultiContractLineItems: {
    using: (lineItemsInfo: DataTable) => any;
};
