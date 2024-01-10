import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract';
export declare class EditSolicitationFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    checkReadOnlyLabelValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    lookupInputFieldClearIcon: (fieldName: string) => any;
    departmentLookupInputFieldValue: (fieldName: string, itemName: any) => any;
}
export declare const solicitation: EditSolicitationFields;
