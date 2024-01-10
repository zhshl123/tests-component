export declare class ContractDefaultLineItemSplittingFields {
    sectionPanel: () => any;
    tableCell: (fieldName: string, rowNumber?: number) => any;
    inputField: (fieldName: string, rowNumber?: number) => any;
    lookupIcon: (fieldName: string, rowNumber?: number) => any;
    popupPanel: () => any;
    checkBox: (rowNumber?: number) => any;
    /**
    * 在弹窗中搜索
    * @param fieldName 字段名称
    * @param rowNumber 行号 第一行为0， 以此类推
    * @param itemName 字段值
    * @param popupFieldName 弹窗中的字段
    */
    searchItemInPopup: (fieldName: string, rowNumber: number, itemName: string, popupFieldName: string) => any;
    /**
    * 在输入框中填值
    */
    fillTextInputField: (fieldName: string, rowNumber: number, itemName: string) => any;
}
export declare const contractDefaultLineItemSlitting: ContractDefaultLineItemSplittingFields;
