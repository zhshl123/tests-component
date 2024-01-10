import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditCS extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    dropdownListBox: (fieldName: string) => any;
    selectDropdownItemB: (fieldName: string, itemName: string | Question<any>) => any;
    dropdownFieldB: (fieldName: string) => any;
    dropdownListBoxB: (fieldName: string) => any;
    dropdownListB: (fieldName: string) => any;
    dropdownItemB: (fieldName: any, itemName: string | Question<any>) => any;
    clickLink: () => any;
    clickLinktoEdit: () => any;
}
export declare const CS: EditCS;
