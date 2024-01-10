import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Page, Text } from '@serenity-js/web'

import { DELETE, EDIT, OK, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton, clickButtonInList, clickMessagePopupButton, waitMessagePopupBoxVisible } from '../common';
import { EDIT_BUDGET_LINE_ITEM } from '../common/statics';
import { budget } from './components';

export const checkBudgetInfo = {
    using: (budgetInfo: DataTable) => {
        return Task.where(`#actor check budget line item information`,
            clickButtonInList.using(EDIT),
            Wait.until(Page.current().title(), includes(EDIT_BUDGET_LINE_ITEM)),
            budget.checkReadOnlyLabelValue('Fiscal Year', budgetInfo.rowsHash().FiscalYear, SUCCEEDED),
            budget.checkReadOnlyLabelValue('Fund', budgetInfo.rowsHash().Fund, SUCCEEDED),
            budget.checkReadOnlyLabelValue('Approved Date', budgetInfo.rowsHash().ApprovedDate, SUCCEEDED),
            budget.checkReadOnlyLabelValue('Effective Date', budgetInfo.rowsHash().EffectiveDate, SUCCEEDED),
            budget.checkReadOnlyLabelValue('Budget Status', budgetInfo.rowsHash().BudgetStatus, SUCCEEDED),
            Ensure.eventually(Text.of(budget.associatedProjectReadOnlyField()), includes(budgetInfo.rowsHash().AssociatedProject))

        )
    }

}

export const deleteBudget = () => {
    return Task.where(`#actor delete budget`,
        clickActionButton.using(DELETE),
        waitMessagePopupBoxVisible(),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))

    )
}

