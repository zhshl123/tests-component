import { BrowseFormFields } from '../../common/abstract';
export declare class BrowseAssetFields extends BrowseFormFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    editButtonInGrid: () => any;
    printBarCodeButtonInGrid: () => any;
}
export declare const assetBrowse: BrowseAssetFields;
