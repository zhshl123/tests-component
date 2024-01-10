import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { CSHAttributeMap } from './CSHAttributes';

export class EditCSHFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const csh = new EditCSHFields(CSHAttributeMap)
export const browseCsh = new SearchFromFields(CSHAttributeMap)