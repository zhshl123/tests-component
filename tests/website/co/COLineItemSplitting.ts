import { Ensure, isGreaterThan } from '@serenity-js/assertions'
import { Check, Duration, List, Task, Wait } from '@serenity-js/core'
import { isVisible,Switch } from '@serenity-js/web'

import { DELETE, INSERT, OK, POPUP, SAVE } from '../../DefaultStaticParams'
import { clickBulkEditSetionButton, clickButton, waitMessagePopupBoxVisible } from '../common'
import { COLineItem } from './components/COLineItemFields'

export const addMultiCOLineItemSplitting = {
    using: (lineItemsInfo: Record<string, string>[]) => {
        const items = List.of(lineItemsInfo)
        return Task.where(`#actor add multi co line item information`,
            openEditLineItemDetailPopup(),

            Switch.to(COLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(COLineItem.lineItemsSectionTitle('Contract Line Item Splits'), isVisible()),
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    clickBulkEditSetionButton.using(INSERT),
                    Check.whether(
                        COLineItem.lineItemsTr().count(), isGreaterThan(items.count())
                    ).andIfSo(
                        // 点击删除按钮
                        COLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                    // 给单元格填值
                    fillLineItemSplittingFields.using(item)
                )

                ),
                COLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

const openEditLineItemDetailPopup = () =>
    Task.where(`#actor open edit line item detail popup`,
        Wait.for(Duration.ofSeconds(5)),
        Ensure.eventually(COLineItem.editableTableBox(), isVisible()),
        COLineItem.clickButtonInButtonGroup('1', POPUP),
        Ensure.eventually(COLineItem.editLineItemDetailPopupPanel(), isVisible()),
    )

export const fillLineItemSplittingFields = {
    using: (item: Record<string, string>) => {
        return Task.where(`#actor fill change order line item splitting fields`,
            COLineItem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project),
            COLineItem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund),
            COLineItem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage),
            COLineItem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount),

        )
    }
}