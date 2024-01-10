import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
import { SearchFromFields } from '../common/abstract';
export declare class EditAssignment extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    lookupInputField: (fieldName: string) => any;
    dropdownItemLast: (fieldName: any, itemName: string | Question<any>) => any;
    selectDropdownItemLast: (fieldName: string, itemName: string | Question<any>) => any;
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    generalTab: () => any;
    clickGeneralTab: () => any;
}
export declare const assignment: EditAssignment;
export declare const browseAssignment: SearchFromFields;
