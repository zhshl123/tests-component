import { DataTable } from '@cucumber/cucumber';
import { Task} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton,formatted_now,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_PROPOSAL_NAME } from '../common/statics';
import { proposal} from './EditProposal';

export const addPublicProposal = {
    using: (publicProposal:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            fillPublicProposal.using(
                publicProposal.rowsHash().FirstName,
                publicProposal.rowsHash().LastName,
                publicProposal.rowsHash().City,
                publicProposal.rowsHash().State,
                publicProposal.rowsHash().Email,
                publicProposal.rowsHash().ProposalName,
                publicProposal.rowsHash().ProposalDescription,
            ),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
} 

export const fillPublicProposal = {
    using: (firstName:string,lastName:string,city:string,state:string,email:string,proposalName:string,proposalDescription:string) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields`,
            proposal.fillTextInputField('First Name',firstName),
            proposal.fillTextInputField('Last Name',lastName),
            proposal.fillTextInputField('City',city),
            proposal.selectDropdownItem('State',state),
            proposal.fillTextInputField('Email',email),
            proposal.fillTextInputField('Proposal Name',proposalName + timestamp),
            proposal.setCookie(COOKIE_PROPOSAL_NAME,proposalName + timestamp),
            proposal.fillTextInputField('Proposal Description',proposalDescription)
        )
    }
}

export const checkPublicProposal = {
    using: (publicProposal:DataTable) => {
        return Task.where(`#actor check all fields`,
            proposal.clickNewEditIcon(),
            proposal.checkTextInputFieldValue('First Name',publicProposal.rowsHash().FirstName,SUCCEEDED),
            proposal.checkTextInputFieldValue('Last Name',publicProposal.rowsHash().LastName,SUCCEEDED),
            proposal.checkTextInputFieldValue('City',publicProposal.rowsHash().City,SUCCEEDED),
            proposal.checkDropdownInputFieldValue('State',publicProposal.rowsHash().State,SUCCEEDED),
            proposal.checkTextInputFieldValue('Email',publicProposal.rowsHash().Email,SUCCEEDED),
            proposal.checkTextInputFieldValue('Proposal Name',Cookie.called(COOKIE_PROPOSAL_NAME).value(),SUCCEEDED),
            proposal.checkTextInputFieldValue('Proposal Description',publicProposal.rowsHash().ProposalDescription,SUCCEEDED),
        )
    }
}

export const deleteProposal = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const addStaffProposal = {
    using: (staffProposal:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            proposal.fillTextInputField('Proposal Name',staffProposal.rowsHash().ProposalName + timestamp),
            proposal.setCookie(COOKIE_PROPOSAL_NAME,staffProposal.rowsHash().ProposalName + timestamp),
            proposal.fillTextInputField('First Name',staffProposal.rowsHash().FirstName),
            proposal.fillTextInputField('Last Name',staffProposal.rowsHash().LastName),
            proposal.fillTextInputField('Email',staffProposal.rowsHash().Email),
            proposal.selectDropdownItem('Authorization Status',staffProposal.rowsHash().AuthorizationStatus),
            proposal.fillTextInputField('Proposal Description',staffProposal.rowsHash().ProposalDescription),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkStaffProposal = {
    using: (staffProposal:DataTable) => {
        return Task.where(`#actor check all fields`,
            proposal.clickNewEditIcon(),
            proposal.checkTextInputFieldValue('Proposal Name',Cookie.called(COOKIE_PROPOSAL_NAME).value(),SUCCEEDED),
            proposal.checkTextInputFieldValue('First Name',staffProposal.rowsHash().FirstName,SUCCEEDED),
            proposal.checkTextInputFieldValue('Last Name',staffProposal.rowsHash().LastName,SUCCEEDED),
            proposal.checkTextInputFieldValue('Email',staffProposal.rowsHash().Email,SUCCEEDED),
            proposal.checkDropdownInputFieldValue('Authorization Status',staffProposal.rowsHash().AuthorizationStatus,SUCCEEDED),
            proposal.checkTextInputFieldValue('Proposal Description',staffProposal.rowsHash().ProposalDescription,SUCCEEDED),
        )
    }
}