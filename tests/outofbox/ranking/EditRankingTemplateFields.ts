
import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement, PageElements, Text } from '@serenity-js/web';

import { EditFromFields, SearchFromFields } from '../common/abstract';
import { rankingMap } from './RankingAttributes';

export class EditRankingTemplateFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 给表单元格填值
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称 
     * @param value 要填的值
     * @returns 
     */
    fillCriteriaTextField = (rowNumber: number, fieldName: string, value: string) => {
        return Task.where(`#actor fill ranking criteria row:${rowNumber} text field ${fieldName} with ${value}`,
            Click.on(rankingTempalte.criteriaTableCell(rowNumber, fieldName)),
            Enter.theValue(value).into(rankingTempalte.criteriaTableTextInputField(rowNumber, fieldName)),
        )

    }

    checkCriteriaFieldCell = (rowNumber: number, fieldName: string, value: string) => {
        return Task.where(`#actor check ranking criteria row:${rowNumber} text field value ${fieldName} with ${value}`,
            Ensure.eventually(Text.of(rankingTempalte.criteriaTableCell(rowNumber, fieldName)), equals(value))

        )

    }

    /**
     * 给表数字格式单元格填值
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称 
     * @param value 要填的值
     * @returns 
     */
    fillCriteriaNumberField = (rowNumber: number, fieldName: string, value: string) => {
        return Task.where(`#actor fill ranking criteria row:${rowNumber} number field ${fieldName} with ${value}`,
            Click.on(rankingTempalte.criteriaTableCell(rowNumber, fieldName)),
            Enter.theValue(value).into(rankingTempalte.criteriaTableNumberInputField(rowNumber, fieldName)),
        )

    }

    criteriaTable = () =>
        PageElement.located(By.id('ctl00_body_divTreeView'))
            .describedAs('criteria table')

    criteriaTableBodyRows = () =>
        PageElements.located(By.css('.cip-grid-body__rownumber'))
            .describedAs('criteria table body rows')

    /**
     * 表的行
     * @param rowNumber 行号，不含表头，第一行为0，以此类推
     * @param fieldName 字段名称
     * @returns 
     */
    criteriaTableCell = (rowNumber: number, fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElements.located(By.css(`[data-field="${mappedFieldName}"]`))
            .nth(rowNumber)
            .describedAs(`criteria table row:${rowNumber} ${fieldName}`)
    }

    criteriaTableCellValue = (rowNumber: number, fieldName: string) => {
        return PageElement.located(By.css(`span`))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`criteria table row:${rowNumber} value`)
    }

    criteriaTableTextInputField = (rowNumber: number, fieldName: string) => {
        return PageElement.located(By.css('input'))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`criteria table row:${rowNumber} ${fieldName} text input field`)
    }

    criteriaTableNumberInputField = (rowNumber: number, fieldName: string) => {
        return PageElement.located(By.css(`[data-role="numerictextbox"]`))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`criteria table row:${rowNumber} ${fieldName} number input field`)
    }

    iconButton = (buttonName: string) =>
        PageElement.located(By.css(`[data-name="img${buttonName}"]`))
            .describedAs(`criteria table icon button:${buttonName}`)

    arrowIconRow = (rowNumber: number, fieldName:string) =>
        PageElement.located(By.css('.cip-arrow.cip-arrow-expand'))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`row:${rowNumber} criteria table arrow row`)

}

export const rankingTempalte = new EditRankingTemplateFields(rankingMap)
export const browseRankingTempalte = new SearchFromFields(rankingMap)