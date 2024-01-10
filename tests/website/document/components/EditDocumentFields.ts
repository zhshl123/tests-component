import { EditFromFields } from '../../common/abstract';
import { documentAttributeMap } from './DocumentAttributes';

export class EditDocumentFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
}

export const editDocument = new EditDocumentFields(documentAttributeMap)