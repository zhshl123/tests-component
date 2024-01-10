import { Ensure, includes, isGreaterThan } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { isVisible, Switch, Text } from '@serenity-js/web';

import { DELETE, INSERT, OK, POPUP, SAVE } from '../../../DefaultStaticParams';
import { clickBulkEditSetionButton, clickButton, waitMessagePopupBoxVisible } from '../../common';
import { contractLineItem } from '../components';

export const addMultiContractSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor add multi contract splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(contractLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(contractLineItem.lineItemsSectionTitle('Contract Line Item Splits'), isVisible()),
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    clickBulkEditSetionButton.using(INSERT),
                    Check.whether(
                        contractLineItem.lineItemsTr().count(), isGreaterThan(items.count())
                    ).andIfSo(
                        // 点击删除按钮
                        contractLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                    // 给单元格填值
                    fillFields.using(item)
                )

                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
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
        Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
        contractLineItem.clickButtonInButtonGroup('1', POPUP),
        Ensure.eventually(contractLineItem.editLineItemDetailPopupPanel(), isVisible()),
    )

const fillFields = {
    using: (item: Record<string, string>) =>
        Task.where(`#actor fill contract splitting line item fileds`,

            contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project),
            contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund),
            contractLineItem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage),
            contractLineItem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount),
        )

}

export const checkMultiContractSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[], expectedResult) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor check multi contract splitting line items`,
            openEditLineItemDetailPopup(),
            Switch.to(contractLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(contractLineItem.lineItemsSectionTitle('Contract Line Item Splits'), isVisible()),
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    Ensure.eventually(Text.of(contractLineItem.tableCell(item.rowNumber, 'Project')), includes(item.Project)),
                    contractLineItem.checkCellValue(item.rowNumber, 'Fund', item.Fund, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Percentage', item.Percentage, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Amount', item.Amount, expectedResult),
                )

                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),

        )
    }
}

export const updateMultiContractSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor update multi contract splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(contractLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
                // 遍历数组，循环修改数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    // 给单元格填值
                    fillFields.using(item)
                )

                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }
}

export const deleteMultiContractSplittingLineItem = {
    using: (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor delete multi contract splitting line items`,
            openEditLineItemDetailPopup(),

            Switch.to(contractLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
                // 遍历数组，循环修改数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.clickButtonInButtonGroup(item.rowNumber, DELETE)
                )
                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }
}