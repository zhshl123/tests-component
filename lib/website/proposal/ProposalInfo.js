"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStaffProposal = exports.addStaffProposal = exports.deleteProposal = exports.checkPublicProposal = exports.fillPublicProposal = exports.addPublicProposal = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditProposal_1 = require("./EditProposal");
exports.addPublicProposal = {
    using: (publicProposal) => {
        return core_1.Task.where(`#actor Input all fields and save `, exports.fillPublicProposal.using(publicProposal.rowsHash().FirstName, publicProposal.rowsHash().LastName, publicProposal.rowsHash().City, publicProposal.rowsHash().State, publicProposal.rowsHash().Email, publicProposal.rowsHash().ProposalName, publicProposal.rowsHash().ProposalDescription), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.fillPublicProposal = {
    using: (firstName, lastName, city, state, email, proposalName, proposalDescription) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields`, EditProposal_1.proposal.fillTextInputField('First Name', firstName), EditProposal_1.proposal.fillTextInputField('Last Name', lastName), EditProposal_1.proposal.fillTextInputField('City', city), EditProposal_1.proposal.selectDropdownItem('State', state), EditProposal_1.proposal.fillTextInputField('Email', email), EditProposal_1.proposal.fillTextInputField('Proposal Name', proposalName + timestamp), EditProposal_1.proposal.setCookie(statics_1.COOKIE_PROPOSAL_NAME, proposalName + timestamp), EditProposal_1.proposal.fillTextInputField('Proposal Description', proposalDescription));
    }
};
exports.checkPublicProposal = {
    using: (publicProposal) => {
        return core_1.Task.where(`#actor check all fields`, EditProposal_1.proposal.clickNewEditIcon(), EditProposal_1.proposal.checkTextInputFieldValue('First Name', publicProposal.rowsHash().FirstName, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Last Name', publicProposal.rowsHash().LastName, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('City', publicProposal.rowsHash().City, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkDropdownInputFieldValue('State', publicProposal.rowsHash().State, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Email', publicProposal.rowsHash().Email, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Proposal Name', web_1.Cookie.called(statics_1.COOKIE_PROPOSAL_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Proposal Description', publicProposal.rowsHash().ProposalDescription, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteProposal = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.addStaffProposal = {
    using: (staffProposal) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditProposal_1.proposal.fillTextInputField('Proposal Name', staffProposal.rowsHash().ProposalName + timestamp), EditProposal_1.proposal.setCookie(statics_1.COOKIE_PROPOSAL_NAME, staffProposal.rowsHash().ProposalName + timestamp), EditProposal_1.proposal.fillTextInputField('First Name', staffProposal.rowsHash().FirstName), EditProposal_1.proposal.fillTextInputField('Last Name', staffProposal.rowsHash().LastName), EditProposal_1.proposal.fillTextInputField('Email', staffProposal.rowsHash().Email), EditProposal_1.proposal.selectDropdownItem('Authorization Status', staffProposal.rowsHash().AuthorizationStatus), EditProposal_1.proposal.fillTextInputField('Proposal Description', staffProposal.rowsHash().ProposalDescription), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkStaffProposal = {
    using: (staffProposal) => {
        return core_1.Task.where(`#actor check all fields`, EditProposal_1.proposal.clickNewEditIcon(), EditProposal_1.proposal.checkTextInputFieldValue('Proposal Name', web_1.Cookie.called(statics_1.COOKIE_PROPOSAL_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('First Name', staffProposal.rowsHash().FirstName, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Last Name', staffProposal.rowsHash().LastName, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Email', staffProposal.rowsHash().Email, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkDropdownInputFieldValue('Authorization Status', staffProposal.rowsHash().AuthorizationStatus, DefaultStaticParams_1.SUCCEEDED), EditProposal_1.proposal.checkTextInputFieldValue('Proposal Description', staffProposal.rowsHash().ProposalDescription, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=ProposalInfo.js.map