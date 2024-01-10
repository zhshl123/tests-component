import { By, PageElement } from '@serenity-js/web';

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

}

export const budget = new EditBudgetFields(budgetAttributesMap)
export const budgetLineItem = new EditBudgetFields(budgetLineitemAttributeMap)