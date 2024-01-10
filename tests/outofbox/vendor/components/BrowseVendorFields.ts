import { SearchFromFields } from '../../common/abstract';
import { vendorAttributeMap } from './VendorAttributes';

export class BrowseVnedorsFields extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }
}

export const browseVendor = new BrowseVnedorsFields(vendorAttributeMap)