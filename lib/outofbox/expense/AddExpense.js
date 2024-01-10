"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldExpense = exports.fillRequiredField = exports.addProjectExpense = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const ProjectTab_1 = require("../project/components/ProjectTab");
const components_1 = require("./components");
const EditExpense_1 = require("./EditExpense");
exports.addProjectExpense = {
    using: (expenseInfo) => {
        return core_1.Task.where(`#actor adds project expense with ${expenseInfo}`, (0, exports.deleteOldExpense)(), common_1.clickSectionButton.using('Add Expense'), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.ADD_PEOJECT_EXPENDITURE_ITEM)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.ADD_PEOJECT_EXPENDITURE_ITEM))).and(core_1.Wait.for(core_1.Duration.ofSeconds(3)), exports.fillRequiredField.using(expenseInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)));
    }
};
exports.fillRequiredField = {
    using: (expenseInfo) => {
        return core_1.Task.where(`#actor fills project expense required field with ${expenseInfo}`, components_1.expense.selectDropdownItem('Expense Status', expenseInfo.rowsHash().ExpenseStatus), components_1.expense.selectDropdownItem('Cost Date', expenseInfo.rowsHash().CostDate), components_1.expense.fillAmountInputField('Source Amount', expenseInfo.rowsHash().SourceAmount), components_1.expense.selectSpecialDate('Cost Date', expenseInfo.rowsHash().CostDate, 0), components_1.expense.selectItemInlookupPopup('Fund', expenseInfo.rowsHash().Fund, 'Fund ID'));
    }
};
const deleteOldExpense = () => {
    const items = core_1.List.of((0, common_1.gridList)());
    return core_1.Task.where(`#actor deletes old expense`, core_1.Check.whether((0, common_1.emptyGrid)(), (0, assertions_1.not)((0, assertions_1.isPresent)())).andIfSo(items.forEach(({ actor, item }) => actor.attemptsTo(ProjectTab_1.projectTab.clickTab('Expenses'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, EditExpense_1.deleteProjectExpense)()))));
};
exports.deleteOldExpense = deleteOldExpense;
//# sourceMappingURL=AddExpense.js.map