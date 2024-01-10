
import { DataTable } from '@cucumber/cucumber'
import { Ensure, isGreaterThan, isPresent } from '@serenity-js/assertions'
import { Check, Duration, List, Task, Wait } from '@serenity-js/core'
import { isVisible } from '@serenity-js/web'

import { DELETE, INSERT, SAVE } from '../../../DefaultStaticParams'
import { checkGridList, checkMessagePopupBox, clickButton, clickSectionButton } from '../../common'
import { contractLineItem } from '../components'
import { contractTab } from '../components/ContractTab'

/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
export const addContractLineItem = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)

    }

}

export const checkContractPaidExpense = () =>

    Task.where(`#actor check contract paid expoenses`,
        contractTab.clickTab('Line Items'),
        Wait.for(Duration.ofSeconds(5)),
        Ensure.eventually(contractLineItem.paidExpenseSectionPanel(), isPresent()),
        checkGridList()
    )

export const addMultiContractLineitems = {
    using: (lineItemsInfo: DataTable) => {

        const items = List.of(lineItemsInfo.hashes())
        return addLineAndfillFields.using(items)
    }
}

const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            contractTab.clickTab('Line Items'),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),

            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickSectionButton.using(INSERT),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
                Check.whether(contractLineItem.lineItemsTr().count(), isGreaterThan(items.count()))
                    .andIfSo(
                        // 点击删除按钮
                        contractLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                // 给单元格填值
                fillFields(item),

            )),

            // 提交保存
            clickButton.using(SAVE),

            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }

}

const fillFields = (item: Record<string, string>) => {
    return Task.where(`#actor fill line fileds`,
        contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
        contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
        contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice),
        contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity),
    );
}

/**
 * 检查多行line item
 */
export const checkMultiContractLineItems = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return checkLineItemsTask.using(items, expectedResult)
    }
}

/**
 * 检查单条line item
 */
export const checkContractLineItem = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]

        const items = List.of(array)
        return checkLineItemsTask.using(items, expectedResult)
    }
}

const checkLineItemsTask = {
    using: (items: List<any>, expectedResult: string) => {
        return Task.where(`#actor check line items value`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),

            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(

                contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult),
                contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult),
                contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult),
                contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
            )
            )
        )
    }
}

export const updateMultiContractLineItems = {
    using: (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor update multi line items`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),

            // 遍历数组，循环更新数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 给单元格填值
                fillFields(item)
            )

            ),

            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const deleteMultiContractLineItems = {
    using: (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor delete multi line items`,
            contractTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
            // 遍历数组，循环删除数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 点击删除按钮
                contractLineItem.clickButtonInButtonGroup(item.rowNumber, DELETE)
            )

            ),
            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }

}
