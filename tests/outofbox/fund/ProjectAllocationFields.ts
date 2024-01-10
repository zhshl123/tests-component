import { Ensure, equals, not } from '@serenity-js/assertions';
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Click, Enter, Hover, isVisible,PageElement, PageElements, Switch } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { projectTab } from '../project/components/ProjectTab';

export class ProjectAllocationFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 给fund allocation表格填值
     * @param rowNumber 行号，第一行为0， 以此类推
     * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
     * @param value 要填的值
     * @returns 
     */
    fillFundAllocationTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill fund allotion table cell value with ${value}`,
            Click.on(this.fundAllocationDetailTableCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.fundAllocationDetailTableCell(rowNumber, colNumber))
        )
    }

    /**
     * 检查Fund Ending Balance 表格中的数据
     * @param colNumber 列序号 第一列为0， 以此类推
     * @param value 要检查的值
     * @returns 
     */
    checkFundEndingBalanceCellValue = (colNumber: number, value: string) => {
        return Task.where(`#actor check Fund Ending Balance table cell value with ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.fundEndingBalanceTableCell(colNumber)), equals(value))
        )
    }

    /**
     * 检查Fund Ending Balance 表格中的数据的颜色
     * @param colNumber 列序号 第一列为0， 以此类推
     * @param value 要检查的值
     * @returns 
     */
    checkFundEndingBalanceCellColor = (colNumber: number, value: string) => {
        return value === 'white' ? Task.where(`#actor check Fund Ending Balance table cell color with ${value}`,
            // Ensure.eventually(Attribute.called('color').of(this.fundEndingBalanceTableCell(colNumber)), equals('#FFFFFF'))
        ) : Task.where(`#actor check Fund Ending Balance table cell color with ${value}`,
            // Ensure.eventually(Attribute.called('color').of(this.fundEndingBalanceTableCell(colNumber)), equals('#FF5353'))
        )
    }

    /**
     * 检查Fund allocation 表格中的数据
     * @param rowNumber 行号，第一行为0，以此类推
     * @param colNumber 列序号 不含首列，第一列为0， 以此类推
     * @param value 要检查的值
     * @returns 
     */
    checkFundAllocationDetailTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check fund allocation detail table cell value with ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.fundAllocationDetailTableCell(rowNumber, colNumber)), equals(value))
        )
    }

    /**
     * 检查Fund allocation 表格中的数据的颜色
     * @param rowNumber 行号，第一行为0，以此类推
     * @param colNumber 列序号 不含首列，第一列为0， 以此类推
     * @param value 要检查的值
     * @returns 
     */
    checkFundAllocationDetailTableCellColor = (rowNumber: number, colNumber: number, value: string) => {
        return value === 'white' ? Task.where(`#actor check fund allocation detail table cell color with ${value}`,
            // Ensure.eventually(Attribute.called('Color').of(this.fundAllocationRDetailTableCell(rowNumber, colNumber)), equals('#FFFFFF'))
        ) : Task.where(`#actor check fund allocation detail table cell color with ${value}`,
            // Ensure.eventually(Attribute.called('Color').of(this.fundAllocationRDetailTableCell(rowNumber, colNumber)), equals('#FF5353'))
        )
    }

    /**
     * 鼠标悬停在fund上面
     * @returns 
     */
    hoverOverFund = () => {
        return Task.where(`#actor hover over fund`,
            Check.whether(
                this.fundAllocationDetailTable(), not(isVisible())
            ).andIfSo(
                projectTab.clickTab('Allocation'),
                Wait.for(Duration.ofSeconds(3)),
            ),
            Ensure.eventually(this.fundAllocationDetailTable(), isVisible()),
            Switch.to(this.fundAllocationDetailTable()),
            Hover.over(this.fundAllocationRDetailTableRowHeadColumn(1))
        )
    }

    /**********************鼠标悬停fund后出来的数据表********************* */
    fundEndingBalancePanel = () =>
        PageElement.located(By.id('ctl00_body_PNFunds'))
            .describedAs('Fund Ending Balance panel')

    fundEndingBalanceTableBodyRow = () =>
        PageElement.located(By.css('.cstdgrid__bodyrow'))
            .of(this.fundEndingBalancePanel())
            .describedAs('Fund Ending Balance table body row')
    /**
     * Fund Ending Balance的单元格
     * @param colNumber 列序号，不含首列，第一列为0 ，以此类推
     * @returns 
     */
    fundEndingBalanceTableCell = (colNumber: number) =>
        PageElements.located(By.css('td input')).nth(colNumber)
            .of(this.fundEndingBalanceTableBodyRow())
            .describedAs(`column ${colNumber} Fund Ending Balance table cell`)

    /****************** fund Allocation Detail ***************** */
    fundAllocationDetailTable = () =>
        PageElement.located(By.id('tblProjectFundingTital'))
            .describedAs('fund allocation detail table')

    /**
     * fund alloaction数据表的行
     * @param rowNumber 行号，第一行为0， 以此类推
     * @returns 
     */
    fundAllocationRDetailTableRow = (rowNumber: number) =>
        PageElements.located(By.css('.cstdgrid__bodyrow'))
            .nth(rowNumber)
            .describedAs('fund allocation detail table row ' + rowNumber)

    /**
     * fund alloaction数据表的行首列
     * @param rowNumber 行号，第一行为0， 以此类推
     * @returns 
     */
    fundAllocationRDetailTableRowHeadColumn = (rowNumber: number) =>
        PageElements.located(By.css('td span'))
            .first()
            .of(this.fundAllocationRDetailTableRow(rowNumber))
            .describedAs('fund allocation detail table row ' + rowNumber)

    /**
     * fund alloaction数据表的单元格
     * @param rowNumber 行号，第一行为0， 以此类推
     * @param colNumber 列序号， 不含首列，第一列为0， 以此类推
     * @returns 
     */
    fundAllocationDetailTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('input'))
            .nth(colNumber)
            .of(this.fundAllocationRDetailTableRow(rowNumber))
            .describedAs(`fund allocation detail table cell row:${rowNumber}, column:${colNumber}`)

}

export const projectAllocation = new ProjectAllocationFields(new Map())