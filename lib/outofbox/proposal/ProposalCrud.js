"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBatchApprovalProposal = exports.confirmBatchApprovalProposal = exports.checkApprovedProposal = exports.assignProposalProjectManager = exports.checkProposalInfo = exports.updateProposalInfo = exports.deleteProposal = exports.addProposalByRequiredFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const BrowseProjectFields_1 = require("../project/components/BrowseProjectFields");
const BrowseProposalFields_1 = require("./BrowseProposalFields");
const EditProposalFields_1 = require("./EditProposalFields");
exports.addProposalByRequiredFields = {
    using: (proposalInfo) => {
        EditProposalFields_1.proposal.proposalName = proposalInfo.rowsHash().ProposalName + common_1.formatted_now;
        EditProposalFields_1.proposal.cycle = proposalInfo.rowsHash().Cycle;
        EditProposalFields_1.proposal.scenario = 'Proposal';
        return core_1.Task.where(`#actor add proposal by required fields`, EditProposalFields_1.proposal.selectDropdownItem('Cycle', EditProposalFields_1.proposal.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProposalFields_1.proposal.checkDropdownInputFieldValue('Scenario', 'Proposals', DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.checkReadOnlyLabelValue('Phase', 'Proposal', DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.checkReadOnlyLabelValue('Proposal Status', 'Draft', DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.fillTextInputField('Proposal Name', EditProposalFields_1.proposal.proposalName), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
const deleteProposal = () => {
    return core_1.Task.where(`#actor delete proposal`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
};
exports.deleteProposal = deleteProposal;
exports.updateProposalInfo = {
    using: (proposalInfo) => {
        EditProposalFields_1.proposal.proposalName = proposalInfo.rowsHash().ProposalName + common_1.formatted_now;
        return core_1.Task.where(`#actor update proposal information`, EditProposalFields_1.proposal.fillTextInputField('Proposal Name', EditProposalFields_1.proposal.proposalName), EditProposalFields_1.proposal.selectDropdownItem('Program', proposalInfo.rowsHash().Program), EditProposalFields_1.proposal.fillTextInputField('Proposal Description', proposalInfo.rowsHash().ProposalDescription), EditProposalFields_1.proposal.selectItemInlookupPopup('Project Manager', proposalInfo.rowsHash().ProjectManager, 'Resource Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkProposalInfo = {
    using: (proposalInfo) => {
        return core_1.Task.where(`#actor check proposal information`, EditProposalFields_1.proposal.checkTextInputFieldValue('Proposal Name', EditProposalFields_1.proposal.proposalName, DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.checkDropdownInputFieldValue('Program', proposalInfo.rowsHash().Program, DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.checkTextInputFieldValue('Proposal Description', proposalInfo.rowsHash().ProposalDescription, DefaultStaticParams_1.SUCCEEDED), EditProposalFields_1.proposal.checkLookupInputFieldMultiValue('Project Manager', proposalInfo.rowsHash().ProjectManager, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.assignProposalProjectManager = {
    using: (username) => {
        return core_1.Task.where(`#actor assign proposal project manager`, EditProposalFields_1.proposal.selectItemInlookupPopup('Project Manager', username, 'Resource Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
const checkApprovedProposal = () => {
    return core_1.Task.where(`#actor check approved proposal project manager`, common_1.openPage.using(statics_1.BROWSE_PROPOSAL), BrowseProposalFields_1.browseProposal.selectDropdownItem('Cycle', EditProposalFields_1.proposal.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), BrowseProposalFields_1.browseProposal.selectScenarioLookupDropdownItem('Draft Plan'), BrowseProposalFields_1.browseProposal.selectLookupDropdownItem('Phase', 'Planning'), BrowseProposalFields_1.browseProposal.selectLookupDropdownItem('Proposal Status', 'Preapproved'), BrowseProposalFields_1.browseProposal.fillTextInputField('Proposal Name', EditProposalFields_1.proposal.proposalName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), BrowseProposalFields_1.browseProposal.checkSearchResult(EditProposalFields_1.proposal.proposalName, DefaultStaticParams_1.SUCCEEDED), BrowseProjectFields_1.browseProject.searchItemInBrowsePlanningProjectPage(statics_1.BROWSE_DRAFT_PLANNING_PROJECT, EditProposalFields_1.proposal.cycle, 'Project', EditProposalFields_1.proposal.proposalName), BrowseProjectFields_1.browseProject.checkSearchResult(EditProposalFields_1.proposal.proposalName, DefaultStaticParams_1.SUCCEEDED));
};
exports.checkApprovedProposal = checkApprovedProposal;
const confirmBatchApprovalProposal = () => {
    return core_1.Task.where(`#actor confirm the batch approval`, EditProposalFields_1.proposal.selectCopySelectedProposalDropdownItem('Cycle1', EditProposalFields_1.proposal.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditProposalFields_1.proposal.copySelectedProposalDropdownField('Scenario1')), (0, assertions_1.equals)('Approved Plans')), EditProposalFields_1.proposal.selectCopySelectedProposalDropdownItem('Scenario1', 'Draft Plans'), web_1.Click.on(EditProposalFields_1.proposal.copySelectedProposalScopingCheckbox()), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on(EditProposalFields_1.proposal.copySelectedProposalOKButton()));
};
exports.confirmBatchApprovalProposal = confirmBatchApprovalProposal;
exports.selectBatchApprovalProposal = {
    using: (buttonName) => {
        return core_1.Task.where(`#actor select batch approval proposal`, common_1.openPage.using(statics_1.BROWSE_PROPOSAL), core_1.Wait.for(core_1.Duration.ofSeconds(2)), BrowseProposalFields_1.browseProposal.selectDropdownItem('Cycle', EditProposalFields_1.proposal.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), BrowseProposalFields_1.browseProposal.selectScenarioLookupDropdownItem(EditProposalFields_1.proposal.scenario), BrowseProposalFields_1.browseProposal.fillTextInputField('Proposal Name', EditProposalFields_1.proposal.proposalName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(BrowseProposalFields_1.browseProposal.firstCheckboxInGrid()), common_1.clickSectionButton.using(buttonName), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=ProposalCrud.js.map