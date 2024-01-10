import { Question } from '@serenity-js/core';
import { SearchFromFields } from '.././common/abstract';
export declare class BrowseRankingPhase extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    emptyGrid: () => any;
    checkSearchResult: (itemName: string | Question<any>, expectedResult: string | Question<any>) => any;
    searchItemInBrowsePage: (fieldName: string, itemName: string | Question<any>) => any;
    NewScopingAreaEditIcon: () => any;
    clickNewEditIcon: () => any;
}
export declare const browseRanking: BrowseRankingPhase;
