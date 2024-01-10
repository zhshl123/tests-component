export declare const openAddInvoicePageByType: {
    using: (invoiceType: string) => any;
};
export declare const addInvoiceGeneralInfo: {
    using: (invoiceInfo: Record<string, string>, invoiceNo: string) => any;
};
export declare const fillGeneralFields: {
    using: (invoiceInfo: Record<string, string>, invoiceNo: string) => any;
};
export declare const fillDynamicFileds: {
    using: (invoiceInfo: Record<string, string>) => any;
};
export declare const checkAddInvoiceResult: {
    using: (expectedResult: string) => any;
};
