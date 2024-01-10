import { BrowseFormFields } from '../../common/abstract';
export declare class BrowseResourceFields extends BrowseFormFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    editButtonInGrid: () => any;
}
export declare const browseResource: BrowseResourceFields;
