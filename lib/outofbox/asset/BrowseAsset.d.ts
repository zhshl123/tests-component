import { Question } from '@serenity-js/core';
import { SearchFromFields } from '../common/abstract';
export declare class BrowseAsset extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    textInputField: (fieldName: string) => any;
    searchItemInBrowsePage: (fieldName: string, itemName: string | Question<any>) => any;
}
export declare const browseAssetInfo: BrowseAsset;
