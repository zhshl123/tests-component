"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectExpense = exports.checkProjectExpense = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const ProjectTab_1 = require("../project/components/ProjectTab");
const components_1 = require("./components");
exports.checkProjectExpense = {
    using: (expenseInfo) => {
        return core_1.Task.where(`#actor checks project expense with ${expenseInfo}`, ProjectTab_1.projectTab.clickTab('Expenses'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MODIFY_PEOJECT_EXPENSE)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MODIFY_PEOJECT_EXPENSE))).and(components_1.expense.checkLookupInputFieldSingleValue('Fund', expenseInfo.rowsHash().Fund, DefaultStaticParams_1.SUCCEEDED), components_1.expense.checkDropdownInputFieldValue('Expense Status', expenseInfo.rowsHash().ExpenseStatus, DefaultStaticParams_1.SUCCEEDED), components_1.expense.checkReadOnlyLabelValue('Expense Type', expenseInfo.rowsHash().ExpenseType, DefaultStaticParams_1.SUCCEEDED), components_1.expense.checkAmountInputFieldValue('Source Amount', expenseInfo.rowsHash().SourceAmount, DefaultStaticParams_1.SUCCEEDED), components_1.expense.checkDateInputFieldValue('Cost Date', expenseInfo.rowsHash().CostDate, DefaultStaticParams_1.SUCCEEDED)));
    }
};
const deleteProjectExpense = () => {
    return core_1.Task.where(`#actor deletes project expense`, web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MODIFY_PEOJECT_EXPENSE))).and(common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5))));
};
exports.deleteProjectExpense = deleteProjectExpense;
//# sourceMappingURL=EditExpense.js.map