
import { EditFromFields } from '../../common/abstract';
import { requestForProposalAttributesMap } from './RequestForProposalAttributes';
export class EditRequestForProposalFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
}

export const rfp = new EditRequestForProposalFields(requestForProposalAttributesMap)
