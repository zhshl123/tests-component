import { LineItemFields } from '../../common/abstract';
export declare class QuestionLineItemFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    QuestionlineItemsSectionPanel: () => any;
    /**
     * 填写edit line item popup页面
     * @param buttonName
     * @returns
     */
    fillEditLineItemDetailPopup: (rowNumber: string, fieldName: string, itemName: string) => any;
    textareaTableCell: (rowNumber: string, fieldName: string) => any;
    textInputFieldInPopup: (fieldName: string) => any;
    popupButton: (fieldName: string, buttonName: string) => any;
    /**
     * click popup button (一般为popup页面顶部的操作按钮)
     * @returns
     */
    clickPopupButton: {
        using: (fieldName: string, buttonName: string) => any;
    };
    emtpyDataTable: () => any;
}
export declare const questionLineItem: QuestionLineItemFields;
