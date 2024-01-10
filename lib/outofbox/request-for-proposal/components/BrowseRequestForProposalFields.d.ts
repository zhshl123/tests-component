import { SearchFromFields } from '../../common/abstract';
export declare class BrowseRequestForProposalFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
}
export declare const browseRequestForProposal: BrowseRequestForProposalFields;
