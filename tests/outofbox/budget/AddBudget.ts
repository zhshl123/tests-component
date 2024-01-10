import { DataTable } from '@cucumber/cucumber'
import { includes, isPresent } from '@serenity-js/assertions'
import { Check, Duration, Task, Wait } from '@serenity-js/core'
import { Click, Enter, isVisible, Page, Switch } from '@serenity-js/web'

import { CANCEL, DELETE, EDIT, OK, SAVE } from '../../DefaultStaticParams'
import { clickActionButton, clickButton, clickButtonInList, clickMessagePopupButton, clickSectionButton, gridList, waitMessagePopupBoxVisible } from '../common'
import { CREATE_BUDGET_LINE_ITEM, EDIT_BUDGET_LINE_ITEM } from '../common/statics'
import { budgetLineItem } from './components'

export const addBudgetLineItem = {
    using: (budgetInfo: DataTable) => {
        return Task.where(`#actor add budget line item information`,
            Check.whether(
                gridList().first(), isVisible()
            ).andIfSo(
                clickButtonInList.using(EDIT),
                Wait.until(Page.whichTitle(includes(EDIT_BUDGET_LINE_ITEM)), isPresent()),
                Wait.for(Duration.ofSeconds(3)),
                deleteOldBudget(),
            ),
            clickSectionButton.using('Add Budget Line Item'),
            Wait.until(Page.whichTitle(includes(CREATE_BUDGET_LINE_ITEM)), isPresent()),
            Switch.to(Page.whichTitle(includes(CREATE_BUDGET_LINE_ITEM))),
            budgetLineItem.selectSpecialDate('Approved Date', budgetInfo.rowsHash().ApprovedDate, 0),
            budgetLineItem.selectSpecialDate('Effective Date', budgetInfo.rowsHash().EffectiveDate, 1),
            budgetLineItem.selectDropdownItem('Fiscal Year', budgetInfo.rowsHash().FiscalYear),
            Click.on(budgetLineItem.dropdownField('Fund')),
            Click.on(budgetLineItem.fundDropdownItem('Fund', budgetInfo.rowsHash().Fund)),
            Enter.theValue(budgetInfo.rowsHash().BudgetAmount).into(budgetLineItem.budgetAmountInputField()),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
            Check.whether(budgetLineItem.duplicateBudgetItemPopup(), isVisible()).andIfSo(
                Switch.to(budgetLineItem.duplicateBudgetItemPopup()).and(
                    Click.on(budgetLineItem.duplicateBudgetItemPopupCancelButton())
                ),
                clickActionButton.using(CANCEL),
                Wait.for(Duration.ofSeconds(5)),
            )
        )
    }
}

export const deleteOldBudget = () => {
    return Task.where(`#actor delete old budget line item information`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(2))
    )
}
