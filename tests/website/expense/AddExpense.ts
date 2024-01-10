import { DataTable } from '@cucumber/cucumber';
import { includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { Page, Switch } from '@serenity-js/web';

import { EDIT, SAVE } from '../../DefaultStaticParams';
import { clickButton, clickButtonInList, clickSectionButton, emptyGrid, gridList } from '../common';
import { ADD_PEOJECT_EXPENDITURE_ITEM } from '../common/statics';
import { expense } from './components';
import { deleteProjectExpense } from './EditExpense';

export const addProjectExpense = {
    using: (expenseInfo: DataTable) => {

        return Task.where(`#actor adds project expense with ${expenseInfo}`,
            deleteOldExpense(),
            clickSectionButton.using('Add Expense'),
            Wait.until(Page.whichTitle(includes(ADD_PEOJECT_EXPENDITURE_ITEM)), isPresent()),
            Switch.to(Page.whichTitle(includes(ADD_PEOJECT_EXPENDITURE_ITEM))).and(
                Wait.for(Duration.ofSeconds(3)),
                fillRequiredField.using(expenseInfo),
                clickButton.using(SAVE),
                Wait.for(Duration.ofSeconds(5)),
            ),

        )
    }
}

export const fillRequiredField = {
    using: (expenseInfo: DataTable) => {
        return Task.where(`#actor fills project expense required field with ${expenseInfo}`,
            expense.selectDropdownItem('Expense Status', expenseInfo.rowsHash().ExpenseStatus),
            expense.fillAmountInputField('Source Amount', expenseInfo.rowsHash().SourceAmount),
            expense.selectSpecialDate('Cost Date', expenseInfo.rowsHash().CostDate, 0),
            expense.selectItemInlookupPopup('Fund', expenseInfo.rowsHash().Fund, 'Fund ID'),

        )
    }
}

export const deleteOldExpense = () => {
    const items = List.of(gridList())
    return Task.where(`#actor deletes old expense`,
        Check.whether(
            emptyGrid(), not(isPresent())
        ).andIfSo(
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickButtonInList.using(EDIT),
                Wait.for(Duration.ofSeconds(3)),
                deleteProjectExpense()
            ))
        )
    )

}