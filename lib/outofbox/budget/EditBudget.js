"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.checkBudgetInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkBudgetInfo = {
    using: (budgetInfo) => {
        return core_1.Task.where(`#actor check budget line item information`, common_1.clickButtonInList.using(DefaultStaticParams_1.EDIT), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_BUDGET_LINE_ITEM)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.EDIT_BUDGET_LINE_ITEM))), components_1.budget.checkReadOnlyLabelValue('Fiscal Year', budgetInfo.rowsHash().FiscalYear, DefaultStaticParams_1.SUCCEEDED), components_1.budget.checkReadOnlyLabelValue('Fund', budgetInfo.rowsHash().Fund, DefaultStaticParams_1.SUCCEEDED), components_1.budget.checkReadOnlyLabelValue('Approved Date', budgetInfo.rowsHash().ApprovedDate, DefaultStaticParams_1.SUCCEEDED), components_1.budget.checkReadOnlyLabelValue('Effective Date', budgetInfo.rowsHash().EffectiveDate, DefaultStaticParams_1.SUCCEEDED), assertions_1.Ensure.eventually(web_1.Text.of(components_1.budget.associatedProjectReadOnlyField()), (0, assertions_1.includes)(budgetInfo.rowsHash().AssociatedProject)));
    }
};
const deleteBudget = () => {
    return core_1.Task.where(`#actor delete budget`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteBudget = deleteBudget;
//# sourceMappingURL=EditBudget.js.map