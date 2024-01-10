import { DataTable } from '@cucumber/cucumber'
import { includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core'
import { Page, Switch } from '@serenity-js/web'

import { DELETE, OK, SUCCEEDED } from '../../DefaultStaticParams'
import { clickActionButton, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common'
import { MODIFY_PEOJECT_EXPENSE } from '../common/statics'
import { expense } from './components'

export const checkProjectExpense = {
    using: (expenseInfo: DataTable) => {
        return Task.where(`#actor checks project expense with ${expenseInfo}`,
            Switch.to(Page.whichTitle(includes(MODIFY_PEOJECT_EXPENSE))).and(
                expense.checkLookupInputFieldSingleValue('Fund', expenseInfo.rowsHash().Fund, SUCCEEDED),
                expense.checkDropdownInputFieldValue('Expense Status', expenseInfo.rowsHash().ExpenseStatus, SUCCEEDED),
                expense.checkReadOnlyLabelValue('Expense Type', expenseInfo.rowsHash().ExpenseType, SUCCEEDED),
                expense.checkAmountInputFieldValue('Source Amount', expenseInfo.rowsHash().SourceAmount, SUCCEEDED),
                expense.checkDateInputFieldValue('Cost Date', expenseInfo.rowsHash().CostDate, SUCCEEDED),
            )
        )
    }
}

export const deleteProjectExpense = () => {
    return Task.where(`#actor deletes project expense`,
        Switch.to(Page.whichTitle(includes(MODIFY_PEOJECT_EXPENSE))).and(
            clickActionButton.using(DELETE),
            waitMessagePopupBoxVisible(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5)),
            Page.current().close()
        )
    )
}
