import { EditFromFields, SearchFromFields } from '../../common/abstract';
export declare class EditExpenseFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const expense: EditExpenseFields;
export declare const browseExpense: SearchFromFields;
