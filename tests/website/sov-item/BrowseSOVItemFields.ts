
import { SearchFromFields } from '../common/abstract';
import { SOVItemAttributesMap } from './SOVItemAttributes';

export class BrowseSOVItemFields extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }
}


export const BrowseSOVItem = new BrowseSOVItemFields(SOVItemAttributesMap)
