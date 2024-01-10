import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Log, Task } from '@serenity-js/core';

import { Workflow } from '../common/abstract';
import { proposal } from './EditProposalFields';
import { proposalAttributeMap } from './ProposalAttributes';

export class ProposalWorkflow extends Workflow {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    checkWorkflowParticipant = (username: string) => {
        return username === '(no participant)' ? Task.where(`#actor check workflow participant with ${username}`,
            Ensure.eventually(this.participantsTable(), isPresent()),
            Check.whether(
                proposal.lookupInputFieldUl('Project Manager'), isPresent()
            ).andIfSo(
                Log.the('proposal project manager already assigned')
            ).otherwise(
                Ensure.eventually(this.participantsTableCell('(no participant)'), isPresent())
            )
        ) : Task.where(`#actor check workflow participant with ${username}`,
            Ensure.eventually(this.participantsTable(), isPresent()),
            Check.whether(
                proposal.lookupInputFieldUl('Project Manager'), isPresent()
            ).andIfSo(
                Ensure.eventually(this.participantsTableCell(username), isPresent())
            ).otherwise(
                Ensure.eventually(this.participantsTableCell('(no participant)'), isPresent())
            )

        )
    }

}

export const proposalWorkflow = new ProposalWorkflow(proposalAttributeMap)