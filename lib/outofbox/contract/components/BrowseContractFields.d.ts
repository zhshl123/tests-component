import { SearchFromFields } from '../../common/abstract';
export declare class BrowseContractFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseContract: BrowseContractFields;
