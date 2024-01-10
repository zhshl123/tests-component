import { Ensure, equals, includes, isGreaterThan } from '@serenity-js/assertions';
import { Check, Duration, List, Log, Task, Wait } from '@serenity-js/core';
import { Click, isVisible, Switch, Text } from '@serenity-js/web';

import { DELETE, INSERT, OK, POPUP, SAVE } from '../../DefaultStaticParams';
import { bulkEditDropdownItem, clickBulkEditSetionButton, clickButton, waitMessagePopupBoxVisible } from '../common';
import { contractLineItem } from './components/ContractLineItemFields';


export class ContractSplittingLineItemCrud {

    addMultiLines = (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor add multi contract splitting line items`,
            this.openEditLineItemDetailPopup(),

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
                    this.fillFields(item)
                )

                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }

    openEditLineItemDetailPopup = () =>
        Task.where(`#actor open edit line item detail popup`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
            contractLineItem.clickButtonInButtonGroup('1', POPUP),
            Ensure.eventually(contractLineItem.editLineItemDetailPopupPanel(), isVisible()),
        )

    fillFields = (item: Record<string, string>) => {
        return Task.where(`#actor fill contract splitting line item fileds`,
            contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Project', item.Project),
            contractLineItem.selectLookupDropdownItem(item.rowNumber, 'Fund', item.Fund),
            Check.whether(
                item.Percentage, equals('')
            ).andIfSo(
                Log.the('Percentage value is empty, skip the field')
            ).otherwise(
                contractLineItem.fillNumberInputField(item.rowNumber, 'Percentage', item.Percentage),
            ),
            Check.whether(
                item.Amount, equals('')
            ).andIfSo(
                Log.the('Amount value is empty, skip the field')
            ).otherwise(
                contractLineItem.fillNumberInputField(item.rowNumber, 'Amount', item.Amount),
            ),
        )
    }



    checkMultiLines = (splittingLineItemInfo: Record<string, string>[], expectedResult) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor check multi contract splitting line items`,
            this.openEditLineItemDetailPopup(),
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


    updateMultiLines = (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor update multi contract splitting line items`,
            this.openEditLineItemDetailPopup(),

            Switch.to(contractLineItem.editLineItemDetailPopupFrame()).and(
                Wait.for(Duration.ofSeconds(5)),
                Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
                // 遍历数组，循环修改数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    // 给单元格填值
                    this.fillFields(item)
                )

                ),
                contractLineItem.clickButtonInEditLineItemDetailPopup(OK),
            ),
            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )
    }


    deleteMultiLines = (splittingLineItemInfo: Record<string, string>[]) => {
        const items = List.of(splittingLineItemInfo)
        return Task.where(`#actor delete multi contract splitting line items`,
            this.openEditLineItemDetailPopup(),

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

export const contractSplittingLineItemCrud = new ContractSplittingLineItemCrud()