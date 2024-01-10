import { Ensure, isGreaterThan, isPresent } from '@serenity-js/assertions'
import { Check, Duration, List, Task, Wait } from '@serenity-js/core'
import { Click, isVisible, Switch } from '@serenity-js/web'

import { ADD, DELETE, INSERT, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { checkMessagePopupBox, clickActionButton, clickAllMultiCheckBox, clickButton, clickSectionButton } from '../common'
import { COLineItem } from './components/COLineItemFields'

export const addMultiCOLineItem = {
    using: (lineItemsInfo: Record<string, string>[]) => {
        const items = List.of(lineItemsInfo)
        return Task.where(`#actor add CO line item information`,
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
            Wait.for(Duration.ofSeconds(5)),
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
            COLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
            COLineItem.fillNumberInputField(item.rowNumber, 'Unit Price Adjustment', item.AdjustedUnitPrice),
            COLineItem.fillNumberInputField(item.rowNumber, 'Quantity Adjustment', item.AdjustedQty),
            COLineItem.fillNumberInputField(item.rowNumber, 'Cost Adjustment', item.AdjustedAmt),

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
            COLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Unit Price Adjustment', item.AdjustedUnitPrice, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Quantity Adjustment', item.AdjustedQty, SUCCEEDED),
            COLineItem.checkCellValue(item.rowNumber, 'Cost Adjustment', item.AdjustedAmt, SUCCEEDED),
        )
    }
}
