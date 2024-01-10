"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldBudget = exports.addBudgetLineItem = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addBudgetLineItem = {
    using: (budgetInfo) => {
        return core_1.Task.where(`#actor add budget line item information`, core_1.Check.whether((0, common_1.gridList)().first(), (0, web_1.isVisible)()).andIfSo(common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_BUDGET_LINE_ITEM)), (0, assertions_1.isPresent)()), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, exports.deleteOldBudget)()), common_1.clickSectionButton.using('Add Budget Line Item'), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.CREATE_BUDGET_LINE_ITEM)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.CREATE_BUDGET_LINE_ITEM))), components_1.budgetLineItem.selectSpecialDate('Approved Date', budgetInfo.rowsHash().ApprovedDate, 0), components_1.budgetLineItem.selectSpecialDate('Effective Date', budgetInfo.rowsHash().EffectiveDate, 1), components_1.budgetLineItem.selectDropdownItem('Fiscal Year', budgetInfo.rowsHash().FiscalYear), web_1.Click.on(components_1.budgetLineItem.dropdownField('Fund')), web_1.Click.on(components_1.budgetLineItem.fundDropdownItem('Fund', budgetInfo.rowsHash().Fund)), web_1.Enter.theValue(budgetInfo.rowsHash().BudgetAmount).into(components_1.budgetLineItem.budgetAmountInputField()), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Check.whether(components_1.budgetLineItem.duplicateBudgetItemPopup(), (0, web_1.isVisible)()).andIfSo(web_1.Switch.to(components_1.budgetLineItem.duplicateBudgetItemPopup()).and(web_1.Click.on(components_1.budgetLineItem.duplicateBudgetItemPopupCancelButton())), common_1.clickActionButton.using(DefaultStaticParams_1.CANCEL), core_1.Wait.for(core_1.Duration.ofSeconds(5))));
    }
};
const deleteOldBudget = () => {
    return core_1.Task.where(`#actor delete old budget line item information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
};
exports.deleteOldBudget = deleteOldBudget;
//# sourceMappingURL=AddBudget.js.map