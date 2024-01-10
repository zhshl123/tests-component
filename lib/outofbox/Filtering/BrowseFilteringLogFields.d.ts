import { SearchFromFields } from '../common/abstract';
export declare class BrowseFilteringLogFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseFilteringLog: BrowseFilteringLogFields;
