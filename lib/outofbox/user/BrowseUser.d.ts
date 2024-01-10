import { SearchFromFields } from '../common/abstract';
export declare class BrowseUser extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseUserInfo: BrowseUser;
