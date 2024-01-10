
import { Ensure, equals } from '@serenity-js/assertions';
import { Log, Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement, PageElements, Text } from '@serenity-js/web';

import { EditFromFields, PageTabs, SearchFromFields } from '../common/abstract';
import { rankingMap } from './RankingAttributes';

export class EditRankingPhaseFields extends EditFromFields {
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
            Click.on(this.criteriaTableCell(rowNumber, fieldName)),
            Enter.theValue(value).into(this.criteriaTableTextInputField(rowNumber, fieldName)),
        )

    }

    checkCriteriaFieldCell = (rowNumber: number, fieldName: string, value: string) => {
        return Task.where(`#actor check ranking criteria row:${rowNumber} text field value ${fieldName} with ${value}`,
            Ensure.eventually(Text.of(this.criteriaTableCell(rowNumber, fieldName)), equals(value))

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
            Click.on(this.criteriaTableCell(rowNumber, fieldName)),
            Enter.theValue(value).into(this.criteriaTableNumberInputField(rowNumber, fieldName)),
        )

    }

    criteriaTable = () =>
        PageElement.located(By.css('.k-evaluation'))
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

    arrowIconRow = (rowNumber: number, fieldName: string) =>
        PageElement.located(By.css('.cip-arrow.cip-arrow-expand'))
            .of(this.criteriaTableCell(rowNumber, fieldName))
            .describedAs(`row:${rowNumber} criteria table arrow row`)

    /********************** View Summary tab************************** */

    /**
     * 校验表体的单元格的值
     * @param rowNumber 表体第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns 
     */
    checkProjectRankingResultCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check Project Ranking Result row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Ensure.eventually(Text.of(this.projectRankingResultTableCell(rowNumber, colNumber)), equals(value))

        )
    }

    /**
     * 校验表体的max score行单元格的值
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns 
     */
    checkCriteriaScoreDetailMaxScoreCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return value === '' ? Task.where(`#actor check Criteria Score Detail Max Score row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Log.the('check value is empty, ship this task')
        ) : Task.where(`#actor check Criteria Score Detail Max Score row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Ensure.eventually(Text.of(this.criteriaScoreDetailTableMaxScoreRowCell(rowNumber, colNumber)), equals(value))
        )
    }

    /**
     * 校验表体的project行的单元格的值
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns 
     */
    checkCriteriaScoreDetailProjectCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return value === '' ? Task.where(`#actor check Criteria Score Detail project row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Log.the('check value is empty, ship this task')
        ) : Task.where(`#actor check Criteria Score Detail project row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Ensure.eventually(Text.of(this.criteriaScoreDetailTableProjectRowCell(rowNumber, colNumber)), equals(value))
        )
    }

    projectRankingResultTable = () =>
        PageElement.located(By.id('ctl00_body_gvAmountRank'))
            .describedAs('project ranking results table')
    /**
     * project ranking results 表体的行
     * @param rowNumber 含表头，表体第一行为0，以此类推
     * @returns 
     */
    projectRankingResultTableBodyRow = (rowNumber: number) =>
        PageElements.located(By.css('tr')).nth(rowNumber)
            .of(this.projectRankingResultTable())
            .describedAs('project ranking results table row:' + rowNumber)
    /**
     * 表体的单元格
     * @param rowNumber 含表头，表体第一行为0，以此类推
     * @param colNumber 表体第一列为0，以此类推
     * @returns 
     */
    projectRankingResultTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td')).nth(colNumber)
            .of(this.projectRankingResultTableBodyRow(rowNumber))
            .describedAs(`project ranking results row:${rowNumber}, column:${colNumber} table cell`)

    criteriaScoreDetailTable = () =>
        PageElement.located(By.id('ctl00_body_gvCriteriaRank'))
            .describedAs('Criteria Score Details table')

    /**
     * project ranking results 表体的行
     * @param rowNumber 含表头，第一行为0，以此类推
     * @returns 
     */
    criteriaScoreDetailTableBodyRow = (rowNumber: number) =>
        PageElements.located(By.css('tr')).nth(rowNumber)
            .of(this.criteriaScoreDetailTable())
            .describedAs('Criteria Score Details table row:' + rowNumber)
    /**
     * 表体的max score行的单元格
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns 
     */
    criteriaScoreDetailTableMaxScoreRowCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td b')).nth(colNumber)
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table Max Score row:${rowNumber}, column:${colNumber} table cell`)

    /**
     * 表体的project的单元格
     * @param rowNumber 含表头，第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns 
     */
    criteriaScoreDetailTableProjectRowCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td')).nth(colNumber)
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table project row:${rowNumber}, column:${colNumber} table cell`)

    lastCriteriaScoreDetailTableProjectRowCell = (rowNumber: number) =>
        PageElements.located(By.css('td')).last()
            .of(this.criteriaScoreDetailTableBodyRow(rowNumber))
            .describedAs(`Criteria Score Details table Project row:${rowNumber}, last column table cell`)

}

export const rankingPhase = new EditRankingPhaseFields(rankingMap)
export const browseRankingPhase = new SearchFromFields(rankingMap)
export const rankingPhaseTab = new PageTabs(new Map())