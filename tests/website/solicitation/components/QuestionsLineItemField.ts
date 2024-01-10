
import { Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web';

import { OK } from '../../../DefaultStaticParams';
import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class QuestionLineItemFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }

    QuestionlineItemsSectionPanel = () =>
        PageElement.located(By.id('ctl00_body_MainPanel'))
            .describedAs('question line item section')

    /**
     * 填写edit line item popup页面
     * @param buttonName 
     * @returns 
     */
    fillEditLineItemDetailPopup = (rowNumber: string, fieldName: string, itemName: string) => {
        return Task.where(`#actor fill row ${rowNumber} line item: ${fieldName} with ${itemName}`,
            Click.on(this.textareaTableCell(rowNumber, fieldName)),
            Click.on(this.textareaTableCell(rowNumber, fieldName)),
            Wait.until(this.textareaPopup('textareaPopup'), isVisible()),
            Switch.to(this.textareaPopup('textareaPopup')).and(

                Enter.theValue(itemName).into(this.textInputFieldInPopup('textareaPopup')),
                this.clickPopupButton.using('textareaPopup', OK)
            )
        )
    }

    textareaTableCell = (rowNumber: string, fieldName: string) => {
        const row = Number(rowNumber) - 1

        return PageElements.located(By.css(`[data-field="ItemName"]`)).nth(row)
            .describedAs(`row ${rowNumber}: ${fieldName} table cell`)

    }

    textInputFieldInPopup = (fieldName: string) => {
        return PageElement.located(By.css(`[name="ItemName"]`))
            .of(this.textareaPopup(fieldName))

    }

    popupButton = (fieldName: string, buttonName: string) =>
        PageElement.located(By.id('ctl00_body_ucTreeView_ucGridView_btn' + buttonName))
            .of(this.textareaPopup(fieldName))
            .describedAs(`popup button ${buttonName}`);

    /**
     * click popup button (一般为popup页面顶部的操作按钮)
     * @returns 
     */
    clickPopupButton = {
        using: (fieldName: string, buttonName: string) =>
            Task.where(`#actor click action button: ${buttonName}`,
                Click.on(this.popupButton(fieldName, buttonName))
            )
    };

    emtpyDataTable = () =>
        PageElement.located(By.css('.k-grid-norecords'))
            .describedAs('empty data table')

}

export const questionLineItem = new QuestionLineItemFields(solicitationAttributesMap)
