/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
export declare const addQuestionLineItem: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const addMultiQuestionLineitems: {
    using: (lineItemsInfo: DataTable) => any;
};
/**
 * 检查多行line item
 */
export declare const checkMultiQuestionLineItems: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
export declare const deleteQuestionLineItems: {
    using: () => any;
};
