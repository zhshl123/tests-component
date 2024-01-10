import { isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement, PageElements } from '@serenity-js/web'

import { EditFromFields } from '../common/abstract';
import { fundAttributesMap } from './FundAttributes';

export class EditFund extends EditFromFields {
    entityMap: Map<string, string>
    fundId:string
    constructor(entityMap) {
        super(entityMap);
    }

    EditIcon = () =>
        PageElements.located(By.css(`[class="clinktext"]`)).last()
            .describedAs('Edit icon')

    ClickEditIcon = () => {
        return Task.where(`#actor click the Edit icon `,
            Check.whether(
                this.EditIcon(), isPresent()
            ).andIfSo(
                Click.on(this.EditIcon()),
            ).otherwise(
                Log.the(`no data`)
            )
        )
    }

    fillFundBalanceTableCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill fund balance table cell row ${rowNumber} column ${colNumber} with ${value}`,
            Click.on(this.beginningbalanceTableCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.beginningbalanceTableCell(rowNumber, colNumber))
        )
    }

    /**********************add fund ******** */
    fundBalanceTable = () =>
        PageElement.located(By.id('ctl00_body_FundInfo_Tablu'))
            .describedAs('fund balance table')

    /**
     * fund balance 表体
     * @param rowNumber 行号，表头开始算，第一行为0，以此类推
     * @returns 
     */
    fundBalanceTableBodyRow = (rowNumber: number) =>
        PageElements.located(By.css('.cstdgrid__bodyrow'))
            .nth(rowNumber)
            .of(this.fundBalanceTable())

    /**
     * fund balance 表体单元格
     * @param rowNumber 行号，表头开始算，第一行为0，以此类推
     * @param colNumber 列序号， 第一列为0， 以此类推
     * @returns 
     */
    beginningbalanceTableCell = (rowNumber: number, colNumber: number) =>
        PageElement.located(By.id(`ctl00_body_FundInfo_tbx_${rowNumber}_${colNumber}`))

}

export const fund = new EditFund(fundAttributesMap)