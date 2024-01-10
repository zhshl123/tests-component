import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Log, Question, Task } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { budgetAttributesMap } from './BudgetAttributes';
import { budgetLineitemAttributeMap } from './BudgetLineItemAttributes';

export class EditBudgetFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    adjustedAmountInputField = () =>
        PageElement.located(By.id('ctl00_body_gvHistory_ctl02_txtAmount'))
            .describedAs('Adjusted Amount input field')

    currentBudgetAmountField = () =>
        PageElement.located(By.id('ctl00_body_gvHistory_ctl02_lblBudgetAmount'))
            .describedAs('Current Budget Amount field')

    associatedProjectReadOnlyField = () =>
        PageElement.located(By.id('ctl00_body_ImplementedProjectAutoID_hlText'))
            .describedAs('Associated Project read only field')

    budgetAmountInputField = () =>
        PageElement.located(By.id('ctl00_body_gvBudget_dgBudget_ctl02_SourceLatestAmount_txtMoney'))
            .describedAs('Budget Amount input field')

    duplicateBudgetItemPopup = () =>
        PageElement.located(By.id('divDuplicateBudgetItems_Confirm'))
            .describedAs('duplicate budget item popup')

    duplicateBudgetItemPopupCancelButton = () =>
        PageElement.located(By.id('ctl00_body_btnDuplicateBudgetItemsCancel'))
            .describedAs('duplicate budget item popup cancel button')

    fundDropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElement.located(By.cssContainingText(`li span`, itemName))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

}

export const budget = new EditBudgetFields(budgetAttributesMap)
export const budgetLineItem = new EditBudgetFields(budgetLineitemAttributeMap)