import { Question } from '@serenity-js/core';
import { SearchFromFields } from '.././common/abstract';
export declare class BrowseTimesheet extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    selectItemInlookupPopup: (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => any;
    searchLookupInBrowsePage: (fieldName: string, itemName: string | Question<any>) => any;
}
export declare const browseTimesheetInfo: BrowseTimesheet;
