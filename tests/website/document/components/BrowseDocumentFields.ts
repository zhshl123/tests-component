import { SearchFromFields } from '../../common/abstract';
import { documentAttributeMap } from './DocumentAttributes';

export class BrowseDocumentFields extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
}

export const browseDocument = new BrowseDocumentFields(documentAttributeMap)