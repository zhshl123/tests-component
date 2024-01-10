import { Task } from '@serenity-js/core';
import { By, Enter, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { rankingMap } from './RankingAttributes';

export class RankingCriteriaLineItemFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 给表单元格填值
     * @param rowNumber 表体，第一行为0，以此类推
     * @param colNumber 表体，第一列为0， 以此类推
     * @param value 要填的值
     * @returns 
     */
    fillTableCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill ranking criteria line item row:${rowNumber}, column:${colNumber} field with ${value}`,
            Enter.theValue(value).into(this.tableBodyRowCell(rowNumber, colNumber)),
        )
    }
    popupWindow = () =>
        PageElement.located(By.id('ifrmEvaluate'))
            .describedAs('criteria line item popup window')

    table = () =>
        PageElement.located(By.id('tblItemList'))
            .describedAs('criteria line item table')

    tableBodyrows = () =>
        PageElements.located(By.css('.cstdgrid__bodyrow'))
            .describedAs('criteria line item table rows')

    /**
     * 表体的单元格
     * @param rowNumber 表体，第一行为0，以此类推
     * @param colNumber 表体操作按钮坐在列，第一列为0， 以此类推
     * @returns 
     */
    tableBodyRowCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css(`td input[type="text"]`))
            .nth(colNumber)
            .of(this.tableBodyrows().nth(rowNumber))
            .describedAs(`criteria line item table row:${rowNumber}, column: ${colNumber}`)

    // 首行的删除按钮
    deleteIcon = () =>
        PageElement.located(By.css(`td [title="Remove"]`))
            .of(this.tableBodyrows().first())
            .describedAs('deleteIcon')

    addBelowIcon = () =>
        PageElement.located(By.css(`[title="Add Below"]`))
            .describedAs('criteria line item table add below icon')

    OKButton = () =>
        PageElement.located(By.id('btnOK'))

    cancelButton = () =>
        PageElement.located(By.css(`[name="ctl02"]`))

}

export const rankingCriteriaLineItem = new RankingCriteriaLineItemFields(rankingMap)