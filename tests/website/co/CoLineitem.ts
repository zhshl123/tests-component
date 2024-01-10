import { Ensure, includes, isGreaterThan, isPresent } from '@serenity-js/assertions'
import { Check, Duration, List, Task, Wait } from '@serenity-js/core'
import { Click, isVisible, Page, Switch } from '@serenity-js/web'

import { ADD, DELETE, INSERT, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { checkMessagePopupBox, clickActionButton, clickAllMultiCheckBox, clickButton, clickSectionButton } from '../common'
import { EDIT_CHANGE_ORDER } from '../common/statics'
import { COLineItem } from './components/COLineItemFields'
import { COTab } from './components/COPageTabs'

export const addMultiCOLineItem = {
    using: (lineItemsInfo: Record<string, string>[]) => {
        const items = List.of(lineItemsInfo)
        return Task.where(`#actor add CO line item information`,
            Switch.to(Page.whichTitle(includes(EDIT_CHANGE_ORDER))),

            COTab.clickTabById('Financial Impact'),
            Wait.for(Duration.ofSeconds(5)),
            Check.whether(
                COLineItem.contractSummaryPanel(), isPresent()
            ).andIfSo(

                clickSectionButton.using(ADD),
                Ensure.eventually(COLineItem.contractSummaryPopup(), isVisible()),
                Switch.to(COLineItem.contractSummaryPopup()).and(
                    clickAllMultiCheckBox(),
                    clickButton.using(OK),
                ),
                Click.on(COLineItem.viewIconInContractSummaryPanel()),
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(COLineItem.viewCOLineItemPanel(), isVisible()),
                Switch.to(COLineItem.viewCOLineItemPanel()).and(
                    itemsForEach.using(items)
                )
            ).otherwise(
                Switch.to(COLineItem.changeItemsPanel()).and(
                    itemsForEach.using(items)
                )
            ),

            // 提交保存
            clickActionButton.using(SAVE),

            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5))
        )

    }
}

export const itemsForEach = {
    using: (items: List<any>) => {
        return Task.where(`#actor for each items information`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickSectionButton.using(INSERT),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(COLineItem.editableTableBox(), isVisible()),
                Check.whether(COLineItem.lineItemsTr().count(), isGreaterThan(items.count()))
                    .andIfSo(
                        // 点击删除按钮
                        COLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                // 给单元格填值
                fillFields.using(item),
            ))

        )
    }
}

export const fillFields = {
    using: (item: Record<string, string>) => {
        return Task.where(`#actor fill change order required fields`,
            COLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
            COLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor),
            COLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
            COLineItem.fillNumberInputField(item.rowNumber, 'Adjusted Unit Price', item.AdjustedUnitPrice),
            COLineItem.fillNumberInputField(item.rowNumber, 'Adjusted Qty', item.AdjustedQty),
            COLineItem.fillNumberInputField(item.rowNumber, 'Adjusted Amt', item.AdjustedAmt),

        )
    }
}

export const checkMultiCOLineItems = {
    using: (lineItemsInfo: Record<string, string>[]) => {
        const items = List.of(lineItemsInfo)
        return Task.where(`#actor check CO line item information`,

            Check.whether(
                COLineItem.contractSummaryPanel(), isPresent()
            ).andIfSo(
                Switch.to(COLineItem.viewCOLineItemPanel()).and(
                    items.forEach(({ actor, item }) => actor.attemptsTo(
                        checkFields.using(item)

                    ))
                )
            ).otherwise(
                Switch.to(COLineItem.changeItemsPanel()).and(
                    items.forEach(({ actor, item }) => actor.attemptsTo(
                        checkFields.using(item)
                    ))
                )
            ),

        )

    }
}

export const checkFields = {
    using: (item: Record<string, string>) => {
        return Task.where(`#actor check change order required fields`,
            COLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Adjusted Unit Price', item.AdjustedUnitPrice, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Adjusted Qty', item.AdjustedQty, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Adjusted Amt', item.AdjustedAmt, SUCCEEDED),
        )
    }
}
