import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract';
export declare class EditBudgetFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    adjustedAmountInputField: () => any;
    currentBudgetAmountField: () => any;
    associatedProjectReadOnlyField: () => any;
    budgetAmountInputField: () => any;
    duplicateBudgetItemPopup: () => any;
    duplicateBudgetItemPopupCancelButton: () => any;
    fundDropdownItem: (fieldName: any, itemName: string | Question<any>) => any;
}
export declare const budget: EditBudgetFields;
export declare const budgetLineItem: EditBudgetFields;
