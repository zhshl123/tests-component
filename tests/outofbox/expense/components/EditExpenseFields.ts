
import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { expenseAttributeMap } from './ExpenseAttributes';

export class EditExpenseFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const expense = new EditExpenseFields(expenseAttributeMap)
export const browseExpense = new SearchFromFields(expenseAttributeMap)