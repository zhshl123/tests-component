import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { designSubmittalAttributeMap } from './DesignSubmittalAttributes';

export class EditCSOFields extends EditFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

}

export const designSubmittal = new EditCSOFields(designSubmittalAttributeMap)
export const browseDesignSubmittal = new SearchFromFields(designSubmittalAttributeMap)