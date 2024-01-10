import { BrowseFormFields } from '../../common/abstract';
export declare class BrowseVendorFields extends BrowseFormFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    editButtonInGrid: () => any;
    deleteButtonInGrid: () => any;
}
export declare const vendorBrowse: BrowseVendorFields;
