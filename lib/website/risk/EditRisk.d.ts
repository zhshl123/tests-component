import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditRisk extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownListBox: (fieldName: string) => any;
    lookupInputField: (fieldName: string) => any;
    lookupDropdownListBox: (fieldName: string) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    checkLooukupInputfieldIsEmpty: (fieldName: string) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
    /**
     * check message popup is visible
     * @returns
     */
    waitMessagePopupBoxVisible: () => any;
}
export declare const risk: EditRisk;
