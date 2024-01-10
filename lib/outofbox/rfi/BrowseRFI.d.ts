import { SearchFromFields } from '../common/abstract';
export declare class BrowseRFI extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseRFIInfo: BrowseRFI;
