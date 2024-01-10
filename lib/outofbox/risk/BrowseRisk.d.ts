import { SearchFromFields } from '../common/abstract';
export declare class BrowseRisk extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    riskTabFrame: () => any;
    addNewIcon: () => any;
}
export declare const browseRiskInfo: BrowseRisk;
