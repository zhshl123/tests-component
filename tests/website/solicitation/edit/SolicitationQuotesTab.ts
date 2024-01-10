import { DataTable } from '@cucumber/cucumber';
import { Ensure } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { DELETE, SUCCEEDED } from '../../../DefaultStaticParams';
import { checkMessagePopupBox, clickActionButton, clickSectionButton } from '../../common';
import { quotesFields } from '../components/QuotesField';
import { solicitationTab } from '../components/SolicitationTab';

export const addQuotes = {
    using: (lineItemsInfo: DataTable) => {

        const items = List.of(lineItemsInfo.hashes())
        return addQuotesLineItems.using(items)
    }

}

export const addQuotesLineItems = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('Quotes'),
            Wait.for(Duration.ofSeconds(5)),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickSectionButton.using('Insert'),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(quotesFields.editableTableBox(), isVisible()),
                Check.whether(
                    quotesFields.tableCell(String(Number(item.rowNumber) + 1), 'Bid Spec No.'), isVisible()
                ).andIfSo(
                    quotesFields.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), 'Remove')
                ),
                // 给Field填值
                quotesFields.fillTextInputField(item.rowNumber, 'Bid Spec No.', item.BidSpecificationNumber),
                quotesFields.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SovItemAutoID),
            )),
            // 提交保存
            clickActionButton.using('Save'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

/**
 * 检查多行line item
 */
export const checkMultiQuotesLineItems = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return expectedResult == SUCCEEDED ? checkLineItemsTask.using(items, expectedResult) : checkEmptyDataTable()
    }
}

/**
 * 检查单条line item
 */
export const checkQuoteLineItem = {
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
            Ensure.eventually(quotesFields.editableTableBox(), isVisible()),

            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                quotesFields.checkCellValue(item.rowNumber, 'Bid Spec No.', item.BidSpecificationNumber, expectedResult),
                quotesFields.checkCellValue(item.rowNumber, 'SOV Item', item.SovItemAutoID, expectedResult),
            ))
        )
    }
}

const checkEmptyDataTable = () => {
    return Task.where(`#actor check line items value`,
        Wait.for(Duration.ofSeconds(5)),
        Ensure.eventually(quotesFields.emptyDataTable(), isVisible()),
    )
}

export const deleteQuotesLineItems = {
    using: (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor delete multi line items`,
            solicitationTab.clickSolicitationTab('Quotes'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(quotesFields.editableTableBox(), isVisible()),
            // 遍历数组，循环删除数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 点击删除按钮
                quotesFields.clickButtonInButtonGroup(item.rowNumber, DELETE)
            )

            ),
            // 提交保存
            clickActionButton.using('Save'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}
