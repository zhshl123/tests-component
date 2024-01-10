"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseExpense = exports.expense = exports.EditExpenseFields = void 0;
const abstract_1 = require("../../common/abstract");
const ExpenseAttributes_1 = require("./ExpenseAttributes");
class EditExpenseFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditExpenseFields = EditExpenseFields;
exports.expense = new EditExpenseFields(ExpenseAttributes_1.expenseAttributeMap);
exports.browseExpense = new abstract_1.SearchFromFields(ExpenseAttributes_1.expenseAttributeMap);
//# sourceMappingURL=EditExpenseFields.js.map