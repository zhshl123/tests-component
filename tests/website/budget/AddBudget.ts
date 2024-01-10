import { DataTable } from '@cucumber/cucumber'
import { includes } from '@serenity-js/assertions'
import { Check, Duration, Task, Wait } from '@serenity-js/core'
import { Click, Enter, isVisible,Page,Switch } from '@serenity-js/web'

import { CANCEL, OK, SAVE } from '../../DefaultStaticParams'
import { clickActionButton, clickButton, clickMessagePopupButton, clickSectionButton, gridList, waitMessagePopupBoxVisible } from '../common'
import { CREATE_BUDGET_LINE_ITEM } from '../common/statics'
import { browseBudget, budgetLineItem } from './components'

export const addBudgetLineItem = {
    using: (budgetInfo: DataTable) => {
        return Task.where(`#actor add budget line item information`,
            Check.whether(
                gridList().first(), isVisible()
            ).andIfSo(
                deleteOldBudget(),
            ),
            clickSectionButton.using('Add Budget Line Item'),
            Wait.until(Page.current().title(), includes(CREATE_BUDGET_LINE_ITEM)),
            budgetLineItem.selectSpecialDate('Approved Date', budgetInfo.rowsHash().ApprovedDate,0),
            budgetLineItem.selectSpecialDate('Effective Date', budgetInfo.rowsHash().EffectiveDate,1),
            budgetLineItem.selectDropdownItem('Fiscal Year', budgetInfo.rowsHash().FiscalYear),
            budgetLineItem.selectItemInlookupPopup('Fund', budgetInfo.rowsHash().Fund, 'Fund ID'),
            Enter.theValue(budgetInfo.rowsHash().BudgetAmount).into(budgetLineItem.budgetAmountInputField()),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
            Check.whether(budgetLineItem.duplicateBudgetItemPopup(), isVisible()).andIfSo(
                Switch.to(budgetLineItem.duplicateBudgetItemPopup()).and(
                    clickButton.using(CANCEL)
                ),
                clickActionButton.using(CANCEL),
                Wait.for(Duration.ofSeconds(5)),
            )
        )
    }
}

export const deleteOldBudget = () => {
    return Task.where(`#actor delete old budget line item information`,
        Click.on(browseBudget.selectAllCheckBoxInBudgetGrid()),
        Click.on(browseBudget.deleteSelectedIcon()),
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(2))
    )
}
