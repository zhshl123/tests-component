import { By, PageElement } from '@serenity-js/web';

import { LineItemFields } from '../../common/abstract';
import { contractLineItemAttributesMap } from './ContractLineItemAttributes';

export class ContractLineItemFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);
    }

    lineItemsSectionPanel = () =>
        PageElement.located(By.id('ctl00_body_bulkEditControl1_ctl02Div'))
            .describedAs('contract line item section')

    paidExpenseSectionPanel = () =>
        PageElement.located(By.id('ctl00_body_div1'))
            .describedAs('Contract Paid Expense Section Panel')

    editLineItemDetailPopupPanel = () =>
        PageElement.located(By.id('ctl00_body_bulkEditControl1_ctl02_pnlShowSplit'))
            .describedAs('edit contract line item detail popup panel')

}

export const contractLineItem = new ContractLineItemFields(contractLineItemAttributesMap)