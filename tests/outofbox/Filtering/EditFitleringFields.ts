import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { By, Click, PageElement, PageElements, Text } from '@serenity-js/web'

import { EditFromFields, SearchFromFields } from '../common/abstract';
import { FilteringMap } from './FilteringAttributes';

export class EditFilteringFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName)

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }

    projectPopup = () =>
        PageElement.located(By.id('ctl00_body_ucFilteringRanking_ifmPopup'))
            .describedAs('project popup')

    selectAllCheckboxInGrid = () =>
        PageElement.located(By.css('#grid #check-all'))
            .describedAs('select all cehckbox in grid')

    projectRankingNote = () =>
        PageElement.located(By.cssContainingText('#ctl00_body_lblRankingNote b', 'Notes:'))
            .describedAs('project ranking notes')

    /************************ filtering result ***************************** */
    filterResultTable = () =>
        PageElement.located(By.id('ctl00_body_gvFilteringPhases'))
            .describedAs('filter result table')

    /**
     * filtering result表的行 
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns 
     */
    filterResultTableRow = (rowNumber: number) =>
        PageElements.located(By.css('tr'))
            .nth(rowNumber)
            .of(this.filterResultTable())
            .describedAs(`filter result table row:${rowNumber}`)

    /**
     * filtering result表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @returns 
     */
    filterResultTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td'))
            .nth(colNumber)
            .of(this.filterResultTableRow(rowNumber))
            .describedAs(`filter result table row:${rowNumber}, column:${colNumber} cell`)

    viewSnapshotIcon = (rowNumber: number, colNumber: number) =>
        PageElement.located(By.css('img'))
            .of(this.filterResultTableCell(rowNumber, colNumber))
            .describedAs(`filter result table row:${rowNumber}, column:${colNumber} cell snapshot icon`)

    /**
     * 加成filtering result表的单元格的值
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @param value 期望值
     * @returns 
     */
    checkFilteringResultTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check filter result table row:${rowNumber}, column:${colNumber} cell value ${value}`,
            Ensure.eventually(Text.of(this.filterResultTableCell(rowNumber, colNumber)), equals(value))
        )
    }

    /********************************* snapshot ********************************* */
    snapshotTable = () =>
        PageElement.located(By.id('ctl00_body_ctl07_table_0'))
            .describedAs('snapshot table')

    /**
     * snapshot 表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @returns 
     */
    snapshotTableRow = (rowNumber: number) =>
        PageElements.located(By.css('tr'))
            .nth(rowNumber)
            .of(this.snapshotTable())
            .describedAs(`snapshot table row:${rowNumber}`)

    /**
     * snapshot 表的单元格
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @returns 
     */
    snapshotTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td'))
            .nth(colNumber)
            .of(this.snapshotTableRow(rowNumber))
            .describedAs(`snapshot table row:${rowNumber}, column:${colNumber} cell`)

    /**
     * 检查snapshot 表的单元格的值
     * @param rowNumber 含表头，第一行为0， 以此类推
     * @param colNumber 第一列为0， 以此类推
     * @param value 期望值
     * @returns 
     */
    checkFilteringSnapshotTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check filter snapshot table row:${rowNumber}, column:${colNumber} cell value ${value}`,
            Ensure.eventually(Text.of(this.snapshotTableCell(rowNumber, colNumber)), equals(value))
        )
    }
}

export const filteringPhase = new EditFilteringFields(FilteringMap)
export const browseFiltering = new SearchFromFields(FilteringMap)
