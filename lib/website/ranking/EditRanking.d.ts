import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class EditRanking extends EditFromFields {
    entityMap: Map<string, string>;
    rankingPhaseName: string;
    rankingStandard: string;
    rankingTemplate: string;
    constructor(entityMap: any);
    textInputField: (fieldName: string) => any;
    dropdownField: (fieldName: string) => any;
    dropdownListBox: (fieldName: string) => any;
    dropdownList: (fieldName: string) => any;
    dateInputField: (fieldName: string) => any;
    dateCalendarIcon: (fieldName: string) => any;
    checkTextInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    checkDropdownInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
    checkDateInputFieldValue: (fieldName: string, itemName: string | Question<any>, expectedResult: string) => any;
}
export declare const ranking: EditRanking;
