import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditTimeSheet extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
    selectLookupDropdownItem: (fieldName: string, itemName: string) => any;
    dropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
    dropdownListBox: (fieldName: string) => any;
    selectDropdownItem: (fieldName: string, itemName: string | Question<any>) => any;
}
export declare const timesheet: EditTimeSheet;
