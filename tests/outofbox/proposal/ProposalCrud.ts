import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Click } from '@serenity-js/web';

import { DELETE, OK, SAVE, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, clickSectionButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { BROWSE_DRAFT_PLANNING_PROJECT, BROWSE_PROPOSAL } from '../common/statics';
import { browseProject } from '../project/components/BrowseProjectFields';
import { browseProposal } from './BrowseProposalFields';
import { proposal } from './EditProposalFields';

export const addProposalByRequiredFields = {
    using: (proposalInfo: DataTable) => {
        proposal.proposalName = proposalInfo.rowsHash().ProposalName + formatted_now
        proposal.cycle = proposalInfo.rowsHash().Cycle
        proposal.scenario = 'Proposal'
        return Task.where(`#actor add proposal by required fields`,
            proposal.selectDropdownItem('Cycle', proposal.cycle),
            Wait.for(Duration.ofSeconds(5)),
            proposal.checkDropdownInputFieldValue('Scenario', 'Proposals', SUCCEEDED),
            proposal.checkReadOnlyLabelValue('Phase', 'Proposal', SUCCEEDED),
            proposal.checkReadOnlyLabelValue('Proposal Status', 'Draft', SUCCEEDED),
            proposal.fillTextInputField('Proposal Name', proposal.proposalName),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const deleteProposal = () => {
    return Task.where(`#actor delete proposal`,
        clickButton.using(DELETE),
        clickMessagePopupButton.using(OK)
    )
}

export const updateProposalInfo = {
    using: (proposalInfo: DataTable) => {
        proposal.proposalName = proposalInfo.rowsHash().ProposalName + formatted_now
        return Task.where(`#actor update proposal information`,
            proposal.fillTextInputField('Proposal Name', proposal.proposalName),
            proposal.selectDropdownItem('Program', proposalInfo.rowsHash().Program),
            proposal.fillTextInputField('Proposal Description', proposalInfo.rowsHash().ProposalDescription),
            proposal.selectItemInlookupPopup('Project Manager', proposalInfo.rowsHash().ProjectManager, 'Resource Name'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkProposalInfo = {
    using: (proposalInfo: DataTable) => {
        return Task.where(`#actor check proposal information`,
            proposal.checkTextInputFieldValue('Proposal Name', proposal.proposalName, SUCCEEDED),
            proposal.checkDropdownInputFieldValue('Program', proposalInfo.rowsHash().Program, SUCCEEDED),
            proposal.checkTextInputFieldValue('Proposal Description', proposalInfo.rowsHash().ProposalDescription, SUCCEEDED),
            proposal.checkLookupInputFieldMultiValue('Project Manager', proposalInfo.rowsHash().ProjectManager, SUCCEEDED),
        )
    }
}

export const assignProposalProjectManager = {
    using: (username: string) => {
        return Task.where(`#actor assign proposal project manager`,
            proposal.selectItemInlookupPopup('Project Manager', username, 'Resource Name'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkApprovedProposal = () => {
    return Task.where(`#actor check approved proposal project manager`,
        openPage.using(BROWSE_PROPOSAL),
        browseProposal.selectDropdownItem('Cycle', proposal.cycle),
        Wait.for(Duration.ofSeconds(5)),
        browseProposal.selectScenarioLookupDropdownItem('Draft Plan'),
        browseProposal.selectLookupDropdownItem('Phase', 'Planning'),
        browseProposal.selectLookupDropdownItem('Proposal Status', 'Preapproved'),
        browseProposal.fillTextInputField('Proposal Name', proposal.proposalName),
        clickButton.using(SEARCH),
        Wait.for(Duration.ofSeconds(3)),
        browseProposal.checkSearchResult(proposal.proposalName, SUCCEEDED),

        browseProject.searchItemInBrowsePlanningProjectPage(BROWSE_DRAFT_PLANNING_PROJECT, proposal.cycle, 'Project', proposal.proposalName),
        browseProject.checkSearchResult(proposal.proposalName, SUCCEEDED),
    )
}

export const confirmBatchApprovalProposal = () => {
    return Task.where(`#actor confirm the batch approval`,

        proposal.selectCopySelectedProposalDropdownItem('Cycle1', proposal.cycle),
        Wait.for(Duration.ofSeconds(5)),
        Ensure.eventually(Attribute.called('title').of(proposal.copySelectedProposalDropdownField('Scenario1')), equals('Approved Plans')),
        proposal.selectCopySelectedProposalDropdownItem('Scenario1', 'Draft Plans'),
        Click.on(proposal.copySelectedProposalScopingCheckbox()),
        Wait.for(Duration.ofSeconds(2)),
        Click.on(proposal.copySelectedProposalOKButton()),

    )
}

export const selectBatchApprovalProposal = {
    using: (buttonName: string) => {
        return Task.where(`#actor select batch approval proposal`,
            openPage.using(BROWSE_PROPOSAL),
            Wait.for(Duration.ofSeconds(2)),
            browseProposal.selectDropdownItem('Cycle', proposal.cycle),
            Wait.for(Duration.ofSeconds(5)),
            browseProposal.selectScenarioLookupDropdownItem(proposal.scenario),
            browseProposal.fillTextInputField('Proposal Name', proposal.proposalName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            Click.on(browseProposal.firstCheckboxInGrid()),
            clickSectionButton.using(buttonName),
            Wait.for(Duration.ofSeconds(5))
        )
    }

}