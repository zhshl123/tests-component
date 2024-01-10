import { Question } from '@serenity-js/core';
/**
     * 修改invoice状态
     * @returns
     */
export declare const changeInvoiceStatus: {
    using: (tartgetStatus: string | Question<any>) => any;
};
/**
 * 检查approved后的read only情况
 * @returns
 */
export declare const checkReadOnlyInvoice: () => any;
export declare const payInvoice: () => any;
export declare const updateInvoiceGeneralInfo: {
    using: (invoiceNo: string, invoiceInfo: Record<string, string | Question<any>>) => any;
};
export declare const checkInvoiceGeneralInfo: {
    using: (invoiceInfo: Record<string, string | Question<any>>) => any;
};
export declare const deleteInvoice: () => any;
/**
 * 检查contract的invoice 列表
 * @returns
 */
export declare const checkContractInvoice: {
    using: (invoiceNo: string | Question<any>) => any;
};
