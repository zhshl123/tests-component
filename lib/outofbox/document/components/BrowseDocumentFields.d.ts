import { SearchFromFields } from '../../common/abstract';
export declare class BrowseDocumentFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseDocument: BrowseDocumentFields;
