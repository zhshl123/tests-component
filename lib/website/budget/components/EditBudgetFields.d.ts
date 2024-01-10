import { EditFromFields } from '../../common/abstract';
export declare class EditBudgetFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    adjustedAmountInputField: () => any;
    currentBudgetAmountField: () => any;
    associatedProjectReadOnlyField: () => any;
    budgetAmountInputField: () => any;
    duplicateBudgetItemPopup: () => any;
}
export declare const budget: EditBudgetFields;
export declare const budgetLineItem: EditBudgetFields;
