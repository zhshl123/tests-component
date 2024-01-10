import { Question } from '@serenity-js/core';
import { SearchFromFields } from '.././common/abstract';
export declare class BrowseSA extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    searchItemInBrowsePage: (fieldName: string, itemName: string | Question<any>) => any;
}
export declare const browseSAInfo: BrowseSA;