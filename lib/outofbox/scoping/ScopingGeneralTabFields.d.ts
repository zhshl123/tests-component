import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class ScopingGeneralTabFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    textInputField: (fieldName: string) => any;
    dropdownField: (fieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    checkDropdownInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    scopingAreaTabBar: () => any;
    scopingAreaTab: (tabName: string) => any;
}
export declare const scopingGeneral: ScopingGeneralTabFields;
