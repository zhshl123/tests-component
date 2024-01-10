
import { DataTable } from '@cucumber/cucumber'
import { Ensure, isGreaterThan, isPresent } from '@serenity-js/assertions'
import { Check, Duration, List, Task, Wait } from '@serenity-js/core'
import { isVisible } from '@serenity-js/web'

import { DELETE, INSERT, SAVE } from '../../DefaultStaticParams'
import { checkGridList, checkMessagePopupBox, clickButton, clickSectionButton } from '../common'
import { contractLineItem } from './components/ContractLineItemFields'
import { contractTab } from './components/ContractTab'
import { contractCrud } from './ContractCrud'

export class ContractLineitemCrud {

    /**
     * 添加单条line item数据
     * @param lineItemsInfo line数据
     */
    addSingleLine = (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return this.addLineAndFillFields(items, contractCrud.contractType)

    }

    addMultiLines = (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return this.addLineAndFillFields(items, contractCrud.contractType)
    }

    checkPaidExpense = () =>
        Task.where(`#actor check contract paid expoenses`,
            contractTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.paidExpenseSectionPanel(), isPresent()),
            checkGridList()
        )

    addLineAndFillFields = (items: List<any>, contractType: string) => {
        return Task.where(`#actor add multi line items`,
            contractTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
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
                this.fillAllFields(item, contractType),

            )),

            // 提交保存
            clickButton.using(SAVE),

            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5))
        )
    }

    fillAllFields = (item: Record<string, string>, contractType: string) => {
        if (contractType == 'Unit Price') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.fillTextInputField(item.rowNumber, 'Bid Specs No.', item.BidSpecsNo),
                contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
                contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor),
                contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity),
            )
        }
        if (contractType == 'GMP') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
                contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor),
                contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity),
            )
        }
        if (contractType == 'Professional Service' || contractType == 'T & M') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
                contractLineItem.selectLookupDropdownItem(item.rowNumber, '(Sub-)Contractor', item.Contractor),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount),
            )
        }
        if (contractType == 'NTE') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.selectDropdownItem(item.rowNumber, 'Contract Cost Type', item.ContractCostType),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount),
            )
        }
        if (contractType == 'Job Costing Master') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.selectDropdownItem(item.rowNumber, 'Category', item.Category),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Amount', item.InitialAmount),
            )
        }
        if (contractType == 'Job Order') {
            return Task.where(`#actor fill line fileds`,
                contractLineItem.selectDropdownItem(item.rowNumber, 'Category', item.Category),
                contractLineItem.selectLookupDropdownItem(item.rowNumber, 'SOV Item', item.SOVItem),
                contractLineItem.selectDropdownItem(item.rowNumber, 'Unit', item.Unit),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice),
                contractLineItem.fillNumberInputField(item.rowNumber, 'Initial Quantity', item.InitialQuantity),
            )
        }
    }

    /**
     * 检查多行line item
     */
    checkMultiLines = (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return this.checkAllFieldsValue(items, contractCrud.contractType, expectedResult)
    }

    /**
     * 检查单条line item
     */
    checkSingleLine = (lineItemsInfo: DataTable, expectedResult: string) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]

        const items = List.of(array)
        return this.checkAllFieldsValue(items, contractCrud.contractType, expectedResult)
    }

    checkAllFieldsValue = (items: List<any>, contractType: string, expectedResult: string) => {
        if (contractType == 'Unit Price') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'Bid Specs No.', item.BidSpecsNo, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                    // contractLineItem.checkCellValue(item.rowNumber, 'Category', item.Category, expectedResult),
                    // contractLineItem.checkCellValue(item.rowNumber, 'Contract Cost Type', item.ContractCostType, expectedResult),
                ))
            )
        }
        if (contractType == 'GMP') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                ))
            )
        }
        if (contractType == 'Professional Service' || contractType == 'T & M') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, '(Sub-)Contractor', item.Contractor, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                ))
            )
        }
        if (contractType == 'NTE') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Contract Cost Type', item.ContractCostType, expectedResult),
                ))
            )
        }

        if (contractType == 'Job Costing Master') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Category', item.Category, expectedResult),
                ))
            )
        }
        if (contractType == 'Job Order') {
            return Task.where(`#actor check line items value`,
                // 遍历数组，循环添加数据
                items.forEach(({ actor, item }) => actor.attemptsTo(
                    contractLineItem.checkCellValue(item.rowNumber, 'SOV Item', item.SOVItem, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Unit', item.Unit, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Unit Price', item.InitialUnitPrice, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Quantity', item.InitialQuantity, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Initial Amount', item.InitialAmount, expectedResult),
                    contractLineItem.checkCellValue(item.rowNumber, 'Category', item.Category, expectedResult),
                ))
            )
        }

    }

    updateMultiContractLineItems = (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor update multi line items`,
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),

            // 遍历数组，循环更新数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 给单元格填值
                this.fillAllFields(item, contractCrud.contractType)
            )),

            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5))
        )
    }

    deleteMultLines = (lineItemsInfo: DataTable) => {
        const items = List.of(lineItemsInfo.hashes())
        return Task.where(`#actor delete multi line items`,
            contractTab.clickTab('Line Items'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(contractLineItem.editableTableBox(), isVisible()),
            // 遍历数组，循环删除数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                // 点击删除按钮
                contractLineItem.clickButtonInButtonGroup(item.rowNumber, DELETE)
            )),
            // 提交保存
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const contractLineItemCrud = new ContractLineitemCrud()