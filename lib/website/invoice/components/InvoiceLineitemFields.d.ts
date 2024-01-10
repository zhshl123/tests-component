import { LineItemFields } from '../../common/abstract';
export declare class InvoiceLineItemFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    lineItemsSectionPanel: () => any;
    /**
     * 点击load from后的弹窗
     * @returns
     */
    lineItemLoadFromPopupPanel: () => any;
    /**
     * 点击edit line item detail图标后的弹窗
     * @returns
     */
    editLineItemDetailPopupPanel: () => any;
    /**
     * 勾选全部的line item
     * @returns
     */
    selectAllContractLineItemInPopup: () => any;
    /**
     * 勾选目标的line item
     * @returns
     */
    selectContractLineItemInPopup: (itemName: string) => any;
    /**
     * 检查edit line item detail弹窗中的按钮是否可见
     * @param buttonName
     * @param expectedResult
     * @returns
     */
    checkButtonVisibleInEditLineItemDetailPopup: (targetpopupPanel: Question<any>, buttonName: string, expectedResult: string) => any;
}
export declare const invoiceLineitem: InvoiceLineItemFields;
