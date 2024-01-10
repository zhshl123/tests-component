import { SearchFromFields } from '../../common/abstract';
import { browseInvoiceAttributeMap } from './BrowseInvoiceAttributes';

export class BrowseInvoiceFields extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }
}

export const browseInvoice = new BrowseInvoiceFields(browseInvoiceAttributeMap)