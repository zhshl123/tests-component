import { Ensure, equals, includes, isGreaterThan } from '@serenity-js/assertions'
import { Check, Duration, List, Log, Task, Wait } from '@serenity-js/core'
import { isVisible, Switch, Text } from '@serenity-js/web'

import { DELETE, INSERT, OK, POPUP, SAVE } from '../../../DefaultStaticParams'
import { clickBulkEditSetionButton, clickButton, waitMessagePopupBoxVisible } from '../../common'
import { invoiceLineitem } from '../components'

export const addMultiInvoiceSplittingLineItems = {
    using: (invoiceSplittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(invoiceSplittingLineItemInfo)
        return Task.where(`#actor add multi invoice splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(invoiceLineitem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(invoiceLineitem.lineItemsSectionTitle('Invoice Line Item Splits'), isVisible()),
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    clickBulkEditSetionButton.using(INSERT),
                    Check.whether(invoiceLineitem.lineItemsTr().count(), isGreaterThan(items.count()))
                        .andIfSo(
                            // 点击删除按钮
                            invoiceLineitem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                        ),
                    // 给单元格填值
                    fillFields.using(item)
                )

                ),
                invoiceLineitem.clickButtonInEditLineItemDetailPopup(OK),
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
        Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),
        // 这里默认首条line item
        invoiceLineitem.clickButtonInButtonGroup('1', POPUP),
        Ensure.eventually(invoiceLineitem.editLineItemDetailPopupPanel(), isVisible()),
    )

const fillFields = {
    using: (item: Record<string, string>) =>
        Task.where(`#actor fill invoice splitting line item fileds`,

            invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project),
            invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund),
            Check.whether(
                item.Amount, equals('')
            ).andIfSo(
                Log.the('Amount value is empty, skip this field')
            ).otherwise(
                invoiceLineitem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount),
            ),
            Check.whether(
                item.Percentage, equals('')
            ).andIfSo(
                Log.the('Percentage value is empty, skip this field')
            ).otherwise(
                invoiceLineitem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage),
            )
        )
}

export const checkMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[], expectedResult) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor check multi invoice splitting line items`,
            openEditLineItemDetailPopup(),
            Switch.to(invoiceLineitem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(invoiceLineitem.lineItemsSectionTitle('Invoice Line Item Splits'), isVisible()),
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    Ensure.eventually(Text.of(invoiceLineitem.tableCell(item.rowNumber, 'Project')), includes(item.Project)),
                    invoiceLineitem.checkCellValue(item.rowNumber, 'Fund', item.Fund, expectedResult),
                    invoiceLineitem.checkCellValue(item.rowNumber, 'Percentage', item.Percentage, expectedResult),
                    invoiceLineitem.checkCellValue(item.rowNumber, 'Amount', item.Amount, expectedResult),
                )

                ),
                invoiceLineitem.clickButtonInEditLineItemDetailPopup(OK),
            ),

        )
    }
}

export const updateMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor update multi invoice splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(invoiceLineitem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),
                // 遍历数组，循环修改数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    // 给单元格填值
                    fillFields.using(item)
                )

                ),
                invoiceLineitem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }
}

export const deleteMultiInvoiceSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor delete multi invoice splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(invoiceLineitem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),
                // 遍历数组，循环修改数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    invoiceLineitem.clickButtonInButtonGroup(item.rowNumber, DELETE)
                )
                ),
                invoiceLineitem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }
}