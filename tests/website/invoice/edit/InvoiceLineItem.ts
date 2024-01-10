import { DataTable } from '@cucumber/cucumber';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { DELETE, INSERT, LOAD_FROM, SAVE } from '../../../DefaultStaticParams';
import { checkMessagePopupBox, clickBulkEditSetionButton, clickButton, waitPageSaveLodingLayerInvisible } from '../../common';
import { invoiceTab } from '../components';
import { invoiceLineitem } from '../components/InvoiceLineitemFields';

/**
 * 添加line item, line item从关联的contract或PO全选导入
 * @returns 
 */
export const loadLineItem = {

    using: (invoiceLineItemInfo: Record<string, string>[]) => {
        const items = List.of(invoiceLineItemInfo)
        return Task.where(`#actor add invoice Line item by load from associated contract or purchase`,
            invoiceTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Wait.until(invoiceLineitem.editableTableBox(), isVisible()),

            clickBulkEditSetionButton.using(LOAD_FROM),

            // 遍历数组，循环更新数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                invoiceLineitem.selectContractLineItemInPopup(item.SOVItem),
                // 给单元格填值
                // fillFields.using(item)

            )),

            clickButton.using(SAVE),
            checkMessagePopupBox(),
            waitPageSaveLodingLayerInvisible()

        )
    }
}

/**
 * 添加line item(针对invoice only)
 * 
 */
export const addMultiInvoiceLineItems = {
    using: (invoiceLineitemInfo: Record<string, string>[]) => {
        const items = List.of(invoiceLineitemInfo)
        return Task.where(`#actor add invoice Line items`,
            invoiceTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),

            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickBulkEditSetionButton.using(INSERT),
                Ensure.eventually(invoiceLineitem.buttonGroupCell(item.rowNumber), isVisible()),
                Check.whether(invoiceLineitem.lineItemsTr().count(), isGreaterThan(items.count()))
                    .andIfSo(
                        // 点击删除按钮
                        invoiceLineitem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                // 给单元格填值
                fillFields.using(item)
            )),

            // 提交保存
            clickButton.using(SAVE),

            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))

        )
    }
}

const fillFields = {
    using: (item: Record<string, string>) =>
        Task.where(`#actor fill invoice line item fileds`,
            invoiceLineitem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
            invoiceLineitem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor),
            invoiceLineitem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
            invoiceLineitem.fillNumberInputField(item.rowNumber, 'Unit Price', item.UnitPrice),
            invoiceLineitem.fillNumberInputField(item.rowNumber, 'Quantity', item.Quantity),
            invoiceLineitem.fillNumberInputField(item.rowNumber, 'Retainage Rate', item.RetainageRate),
        )

}

export const checkInvoiceLineItems = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor check invoice line item`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),

            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                invoiceLineitem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                invoiceLineitem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult),
                invoiceLineitem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult),
                invoiceLineitem.checkCellValue(item.rowNumber, 'Unit Price', item.UnitPrice, expectedResult),
                invoiceLineitem.checkCellValue(item.rowNumber, 'Quantity', item.Quantity, expectedResult),
                invoiceLineitem.checkCellValue(item.rowNumber, 'Retainage Rate', item.RetainageRate, expectedResult),
            ))
        )
    }
}

export const updateMultiInvoiceLineItem = {
    using: (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor update multi invoice line items`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),

            // 遍历数组，循环更新数据
            items.forEach(({ actor, item }) => actor.attemptsTo(

                // 给单元格填值
                fillFields.using(item)
            )),

            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const deleteMultiInvoiceLineItems = {
    using: (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor delete multi line items`,
            invoiceTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(invoiceLineitem.editableTableBox(), isVisible()),
            // 遍历数组，循环删除数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 点击删除按钮
                invoiceLineitem.clickButtonInButtonGroup(item.rowNumber, DELETE)
            )),
            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }

}