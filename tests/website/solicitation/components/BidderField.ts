
import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, PageElement, PageElements, Text } from '@serenity-js/web';

import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class BidderFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }

    biddersTable = () =>
        PageElement.located(By.id('ctl00_body_gvBidders'))
            .describedAs('bidders table')

    /**
     * 
     * @param rowNumber 含表头，第一行为0
     * @returns 
     */
    biddersTableTr = (rowNumber: number) =>
        PageElements.located(By.css('tr')).nth(rowNumber)
            .of(this.biddersTable())
            .describedAs('bidders table row:' + rowNumber)

    /**
     * 
     * @param rowNumber 含表头，第一行为0
     * @param colNumber 别序号，第一列为0
     * @returns 
     */
    biddersTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td')).nth(colNumber)
            .of(this.biddersTableTr(rowNumber))
            .describedAs(`bidders table row:${rowNumber}, column:${colNumber} cell`)

    checkBidderTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check bidders table row:${rowNumber}, column:${colNumber} cell value with ${value}`,
            Ensure.eventually(Text.of(this.biddersTableCell(rowNumber, colNumber)), equals(value))
        )

    }

}

export const bidderFields = new BidderFields(solicitationAttributesMap)