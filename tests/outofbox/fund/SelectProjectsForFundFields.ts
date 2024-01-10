import { Ensure, equals } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Click, Enter, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { fundAttributesMap } from './FundAttributes';

export class SelectProjectsForFundFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    searchProject = (projectName: string | Question<any>) => {
        return Task.where(`#actor search project with ${projectName}`,
            Enter.theValue(projectName).into(this.searchProjectInputfield()),
            Click.on(this.searchProjectIcon()),
            Wait.for(Duration.ofSeconds(3)),
        )
    }

    addProjectToSelectedList = (projectName: string | Question<any>) => {
        return Task.where(`#actor add project ${projectName} to selected list`,
            Check.whether(
                this.selectedProjectList(projectName).first(), isVisible()
            ).andIfSo(
                Log.the(`${projectName} already in selected list`)
            ).otherwise(
                Click.on(this.unselectedProjectList(projectName).first()),
                Click.on(this.addProjectIcon()),
                Wait.for(Duration.ofSeconds(3)),
            )

        )
    }

    searchProjectInputfield = () =>
        PageElement.located(By.id('ctl00_body_txtSearchUnSelectedProjects'))
            .describedAs('search project input field')

    searchProjectIcon = () =>
        PageElement.located(By.id('ctl00_body_btnSearchUnSelectedProject'))
            .describedAs('search project icon')

    unselectedProjectList = (projectName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('#ctl00_body_sltUnSelectedProjects option', projectName))
            .describedAs(`${projectName} unselected project list`)

    selectedProjectList = (projectName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('#ctl00_body_sltSelectedProjects option', projectName))
            .describedAs(`${projectName} selected project list`)

    addProjectIcon = () =>
        PageElement.located(By.id('ctl00_body_imgbtnAdd'))
            .describedAs('add project icon')

    /**
     * 检查project fund数据表单元格的值
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @param value 预期值
     * @returns 
     */
    checkProjectFundAllocationTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check project allocation fund table cell row:${rowNumber} clolumn:${colNumber} with ${value}`,
            Ensure.eventually(Attribute.called('value').of(this.projectFundAllocationTableCell(rowNumber, colNumber)), equals(value))
        )
    }

    projectFundAllocationTable = () =>
        PageElement.located(By.id('SelectProjectForFund'))
            .describedAs('project fund allocation table')

    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @returns 
     */
    projectFundAllocationTableRow = (rowNumber: number) =>
        PageElements.located(By.css('.cstdgrid__bodyrow')).nth(rowNumber)
            .of(this.projectFundAllocationTable())
            .describedAs(`project fund allocation table row: ${rowNumber}`)

    /**
     * project fund数据表的行
     * @param rowNumber 表体第一行为0， 以此类推
     * @param colNumber 不含首列， 第一列为0，以此类推
     * @returns 
     */
    projectFundAllocationTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('input')).nth(colNumber)
            .of(this.projectFundAllocationTableRow(rowNumber))
            .describedAs(`project fund allocation table cell row: ${rowNumber} column: ${colNumber}`)
}

export const selectProjectForFund = new SelectProjectsForFundFields(fundAttributesMap)