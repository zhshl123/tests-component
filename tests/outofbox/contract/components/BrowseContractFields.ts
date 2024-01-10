
import { SearchFromFields } from '../../common/abstract';
import { contractAttributesMap } from './ContractAttributes';

export class BrowseContractFields extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }
    
}

export const browseContract = new BrowseContractFields(contractAttributesMap)