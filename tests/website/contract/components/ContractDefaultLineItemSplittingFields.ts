import { Ensure } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core'
import { By, Click, Enter, isVisible, PageElement, Switch } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButton, clickFirstSingleCheckBox } from '../../common';
import { contractDefaultLineItemSplittingAttributesMap } from './ContractDefaultLineItemSplittingAttributes';
import { browseContract } from './BrowseContractFields';

export class ContractDefaultLineItemSplittingFields {
    sectionPanel = () =>
        PageElement.located(By.id('ctl00_body_ucLineItemSplit_divAll'))
            .describedAs('Default Line Item Splitting section panel')

    tableCell = (fieldName: string, rowNumber = 0) =>
        PageElement.located(By.id('ctl00_body_ucLineItemSplit_' + contractDefaultLineItemSplittingAttributesMap.get(fieldName) + rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber}`)

    inputField = (fieldName: string, rowNumber = 0) =>
        PageElement.located(By.css('input'))
            .of(this.tableCell(fieldName, rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber} lookup input field`)

    lookupIcon = (fieldName: string, rowNumber = 0) =>
        PageElement.located(By.css(`[title="Lookup"]`))
            .of(this.tableCell(fieldName, rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber} lookup icon`)

    popupPanel = () =>
        PageElement.located(By.id('ctl00_body_ucLineItemSplit_ifmPopup'))
            .describedAs('Default Line ItemSplitting Popup panel')

    checkBox = (rowNumber = 0) =>
        PageElement.located(By.id('ctl00_body_ucLineItemSplit_chkbox' + rowNumber))
            .describedAs(`Default Line ItemSplitting row: ${rowNumber} checkbox`)

    /**
    * 在弹窗中搜索
    * @param fieldName 字段名称
    * @param rowNumber 行号 第一行为0， 以此类推
    * @param itemName 字段值
    * @param popupFieldName 弹窗中的字段
    */
    searchItemInPopup = (fieldName: string, rowNumber: number, itemName: string, popupFieldName: string) =>
        Task.where(`#actor search row: ${rowNumber}, field: ${fieldName} with ${itemName} in popup field:${popupFieldName}`,
            Click.on(this.lookupIcon(fieldName, rowNumber)),
            Ensure.eventually(this.popupPanel(), isVisible()),
            Switch.to(this.popupPanel()).and(
                browseContract.fillTextInputField(popupFieldName, itemName),
                clickButton.using(SEARCH),
                Wait.for(Duration.ofSeconds(2)),
                browseContract.checkSearchResult(itemName, SUCCEEDED),
                clickFirstSingleCheckBox(),
                clickButton.using(OK),
            )

        )

    /**
    * 在输入框中填值
    */
    fillTextInputField = (fieldName: string, rowNumber: number, itemName: string) =>
        Task.where(`#actor fill field ${fieldName} with ${itemName}`,
            Click.on(this.inputField(fieldName, rowNumber)),
            Enter.theValue(itemName).into(this.inputField(fieldName, rowNumber))

        )
}
export const contractDefaultLineItemSlitting = new ContractDefaultLineItemSplittingFields()