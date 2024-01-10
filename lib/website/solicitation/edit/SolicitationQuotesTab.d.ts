export declare const addQuotes: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const addQuotesLineItems: {
    using: (items: List<any>) => any;
};
/**
 * 检查多行line item
 */
export declare const checkMultiQuotesLineItems: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
/**
 * 检查单条line item
 */
export declare const checkQuoteLineItem: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
export declare const deleteQuotesLineItems: {
    using: (lineItemsInfo: DataTable) => any;
};
