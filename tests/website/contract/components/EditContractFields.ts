
import { By, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../../common/abstract';
import { contractAttributesMap } from './ContractAttributes';

export class EditContractFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /**
     * edit contract的Invoices页面
     * @returns 
     */
    invoiceTabFrame = () =>
        PageElement.located(By.id('ctl00_body_iFrame'))
            .describedAs('Invoice Tab Frame')

}

export const contract = new EditContractFields(contractAttributesMap)

