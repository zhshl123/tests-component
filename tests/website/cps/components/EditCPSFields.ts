
import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { CPSAttributeMap } from './CPSAttributes';

export class EditCPSFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const cps = new EditCPSFields(CPSAttributeMap)
export const browseCps = new SearchFromFields(CPSAttributeMap)