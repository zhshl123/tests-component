import { Duration, Question, Task, Wait } from '@serenity-js/core';

import { SEARCH } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { clickButton } from '../common';
import { checkGridList } from '../common/GridList';
import { proposalMap } from './ProposalAttributes';

export class BrowseProposalField extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
    searchItemInBrowsePage = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )
    }
}

export const browseProposal = new BrowseProposalField(proposalMap)