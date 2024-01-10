
import { EditFromFields } from '../../common/abstract';
import { invoiceAttributeMap } from './InvoiceAttributes';

export class EditInvoiceFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const invoice = new EditInvoiceFields(invoiceAttributeMap)