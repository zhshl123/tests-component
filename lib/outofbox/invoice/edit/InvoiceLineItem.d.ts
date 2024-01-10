/**
 * 添加line item, line item从关联的contract或PO全选导入
 * @returns
 */
export declare const addInvoiceLineItem: {
    using: (invoiceLineItemInfo: Record<string, string>[]) => any;
};
/**
 * 添加line item(针对invoice only)
 *
 */
export declare const addMultiInvoiceLineItems: {
    using: (invoiceLineitemInfo: Record<string, string>[]) => any;
};
export declare const checkInvoiceLineItems: {
    using: (lineItemsInfo: DataTable, expectedResult: string) => any;
};
export declare const updateMultiInvoiceLineItem: {
    using: (lineItemsInfo: DataTable) => any;
};
export declare const deleteMultiInvoiceLineItems: {
    using: (lineItemsInfo: DataTable) => any;
};
