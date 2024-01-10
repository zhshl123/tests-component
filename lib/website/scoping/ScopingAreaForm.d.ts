import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditScopingArea extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    textInputField: (fieldName: string) => any;
    fillTextInputField: (fieldName: string, itemName: string | Question<any>) => any;
    dropdownField: (fieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    dropdownList: (fieldName: string) => any;
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    Checkbox: (fieldName: string) => any;
    clickSingleCheckBox: (fieldName: string, itemName: string) => any;
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    checkDropdownInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    Panel: () => any;
    NewScopingAreaDeleteIcon: () => any;
    clickNewDelteIcon: () => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
}
export declare const ScopingAreaForm: EditScopingArea;
