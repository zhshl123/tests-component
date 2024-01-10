import { SearchFromFields } from '../../common/abstract';
import { requestForProposalAttributesMap } from './RequestForProposalAttributes';

export class BrowseRequestForProposalFields extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }
    
}

export const browseRequestForProposal = new BrowseRequestForProposalFields(requestForProposalAttributesMap)
