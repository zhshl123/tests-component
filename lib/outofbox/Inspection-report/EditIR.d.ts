import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditIR extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    lookupInputField: (fieldName: string) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    selectDropdownItemA: (fieldName: string, itemName: string) => any;
    dropdownItemA: (fieldName: string, itemName: string) => any;
    textInputFieldA: (fieldName: string) => any;
}
export declare const IR: EditIR;
