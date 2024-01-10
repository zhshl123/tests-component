export declare class SplittingLineItemFields {
    editSplittingLineItemDetailPopupButton: (buttonName: string) => any;
    splittingLineitemSectionPanel: () => any;
    editIconList: () => any;
    editSplittingLineItemDetailPopupPanel: () => any;
    /**
     * 点击grid中首行的button
     * @returns
     */
    clickEditButtonInGrid: () => any;
    /**
     * 检查edit splitting line item detail弹窗的按钮是否可用
     * @param buttonName
     * @param expectedResult
     * @returns
     */
    checkButtonEnableInEditSplittingDetailPopup: (buttonName: string, expectedResult: string) => any;
}
export declare const splittingLineitem: SplittingLineItemFields;
