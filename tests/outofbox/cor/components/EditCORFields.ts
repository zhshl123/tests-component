import { EditFromFields } from '../../common/abstract';
import { corAttributeMap } from './corAttributes';

export class EditCORFields extends EditFromFields { 

    entityMap: Map<string, string>
    constructor(entityMap) { 
        super(entityMap);

    }
}

export const cor = new EditCORFields(corAttributeMap)