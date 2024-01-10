import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditUser extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    ConfirmPasswordInputField: (fieldName: string) => any;
    fillConfirmPasswordInputField: (fieldName: string, itemName: string | Question<any>) => any;
    selectLookupDropdownItem: (fieldName: string, itemName: string) => any;
    lookupClearButton: (fieldName: string) => any;
    lookupInputFieldSingleValue: (fieldName: string) => any;
    lookupDropdownListBox: (fieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    dropdownItemTitle: (fieldName: any, itemName: string | Question<any>) => any;
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    targetButton: (targetButtonName: string) => any;
    clickAddSaveButton: (targetButtonName: string) => any;
    clickEditSaveButton: (targetButtonName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    cencelButton: () => any;
    /**
     * check message popup is visible
     * @returns
     */
    waitMessagePopupBoxVisible: () => any;
    /**
     * radio的label标签
     * @param itemNumber 第几个选项 第一个为0
     * @returns
     */
    userRoleRadioButtonLebel: (itemNth: string) => any;
    /**
     * radio的input标签
     * @param itemNumber 第几个选项 第一个为0
     * @returns
     */
    userRoleRadioButtonInput: (itemNth: string) => any;
}
export declare const user: EditUser;
