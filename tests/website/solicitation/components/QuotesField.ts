import { By, PageElement, PageElements } from '@serenity-js/web';

import { LineItemFields } from '../../common/abstract';
import { solicitationAttributesMap } from './SolicitationAttributes';

export class QuotesFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }

    textareaTableCell = (rowNumber: string, fieldName: string) => {
        const row = Number(rowNumber) - 1
        return PageElements.located(By.css(`[data-field="ItemName"]`)).nth(row)
            .describedAs(`row ${rowNumber}: ${fieldName} table cell`)

    }

    emptyDataTable = () =>
        PageElement.located(By.css('.k-grid-norecords'))
            .describedAs('empty data table')
}

export const quotesFields = new QuotesFields(solicitationAttributesMap)