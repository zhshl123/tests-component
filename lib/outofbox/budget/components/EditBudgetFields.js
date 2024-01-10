"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetLineItem = exports.budget = exports.EditBudgetFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const BudgetAttributes_1 = require("./BudgetAttributes");
const BudgetLineItemAttributes_1 = require("./BudgetLineItemAttributes");
class EditBudgetFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.adjustedAmountInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvHistory_ctl02_txtAmount'))
            .describedAs('Adjusted Amount input field');
        this.currentBudgetAmountField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvHistory_ctl02_lblBudgetAmount'))
            .describedAs('Current Budget Amount field');
        this.associatedProjectReadOnlyField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ImplementedProjectAutoID_hlText'))
            .describedAs('Associated Project read only field');
        this.budgetAmountInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_gvBudget_dgBudget_ctl02_SourceLatestAmount_txtMoney'))
            .describedAs('Budget Amount input field');
        this.duplicateBudgetItemPopup = () => web_1.PageElement.located(web_1.By.id('divDuplicateBudgetItems_Confirm'))
            .describedAs('duplicate budget item popup');
        this.duplicateBudgetItemPopupCancelButton = () => web_1.PageElement.located(web_1.By.id('ctl00_body_btnDuplicateBudgetItemsCancel'))
            .describedAs('duplicate budget item popup cancel button');
        this.fundDropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.cssContainingText(`li span`, itemName))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
    }
}
exports.EditBudgetFields = EditBudgetFields;
exports.budget = new EditBudgetFields(BudgetAttributes_1.budgetAttributesMap);
exports.budgetLineItem = new EditBudgetFields(BudgetLineItemAttributes_1.budgetLineitemAttributeMap);
//# sourceMappingURL=EditBudgetFields.js.map