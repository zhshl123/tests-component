import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { COAttributeMap } from './COAttributes';

export class EditCOFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }
}

export const CO = new EditCOFields(COAttributeMap)
export const browseCO = new SearchFromFields(COAttributeMap)
