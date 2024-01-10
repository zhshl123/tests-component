import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditAsset extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownFieldA: (fieldName: string) => any;
    dropdownListBoxA: (fieldName: string) => any;
    dropdownListA: (fieldName: string) => any;
    dropdownItemA: (fieldName: any, itemName: string | Question<any>) => any;
    selectDropdownItemA: (fieldName: string, itemName: string | Question<any>) => any;
    textInputFieldA: (fieldName: string) => any;
    fillTextInputFieldA: (fieldName: string, itemName: string | Question<any>) => any;
}
export declare const asset: EditAsset;
