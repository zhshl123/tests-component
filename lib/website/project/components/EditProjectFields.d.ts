import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract';
export declare class EditProjectFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    addMasterProjectButton: () => any;
    /**
     * check message popup is visible
     * @returns
     */
    waitMessagePopupBoxVisible: () => any;
    firstExpandIconInGrid: () => any;
    lookupInputFieldClearIcon: (fieldName: any) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns
     */
    checkTextAreaInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
}
export declare const project: EditProjectFields;
