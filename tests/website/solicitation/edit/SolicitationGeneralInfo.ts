import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, isVisible,Page,Text } from '@serenity-js/web'

import { DELETE, OK, SAVE, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButton, clickSolicitationMessagePopupButton, formatted_now, waitMessagePopupBoxVisible } from '../../common';
import { BROWSE_SOLICITATIONS, COOKIE_SOLICITATION_ID, COOKIE_SOLICITATION_NAME, SOLICITATION_MANAGEMENT } from '../../common/statics';
import { browseSolicitation } from '../components/BrowseSolicitationField';
import { solicitation } from '../components/EditSolicitationFields';

export const updateSolicitationGeneralInfo = {
    using: (solicitationInfo: DataTable) => {
        const timestamp = formatted_now;
        const publicationDateParts = solicitationInfo.rowsHash().PublicationDate.split(' ');
        const publicationDate = publicationDateParts[0];
        const publicationTime = publicationDateParts[1] + ' ' + publicationDateParts[2];

        const BidDueDateParts = solicitationInfo.rowsHash().BidDueDate.split(' ');
        const bidDueDate = BidDueDateParts[0];
        const bidDueTime = BidDueDateParts[1] + ' ' + BidDueDateParts[2];

        const QADatelineParts = solicitationInfo.rowsHash().QADateline.split(' ');
        const qaDateline = QADatelineParts[0];
        const qaDatelineTime = QADatelineParts[1] + ' ' + QADatelineParts[2];

        const BidderMeetingDateParts = solicitationInfo.rowsHash().BidderMeetingDate.split(' ');
        const bidderMeetingDate = BidderMeetingDateParts[0];
        const bidderMeetingTime = BidderMeetingDateParts[1] + ' ' + BidderMeetingDateParts[2];

        return Task.where(`#actor update solicitation general information`,
            solicitation.fillTextInputField('Solicitation ID', solicitationInfo.rowsHash().SolicitationID + timestamp),
            solicitation.setCookie(COOKIE_SOLICITATION_ID, solicitationInfo.rowsHash().SolicitationID + timestamp),

            solicitation.fillTextInputField('Solicitation Name', solicitationInfo.rowsHash().SolicitationName + timestamp),
            solicitation.setCookie(COOKIE_SOLICITATION_NAME, solicitationInfo.rowsHash().SolicitationName + timestamp),

            solicitation.selectSpecialDate('Publication Date', publicationDate, 0),
            solicitation.selectClock('Publication Date', publicationTime),

            solicitation.selectSpecialDate('Bid Due Date', bidDueDate, 1),
            solicitation.selectClock('Bid Due Date', bidDueTime),

            solicitation.clickSingleCheckBox('Is Sealed Bid', solicitationInfo.rowsHash().IsSealedBid),
            solicitation.selectDropdownItem('Status', solicitationInfo.rowsHash().Status),
            solicitation.selectDropdownItem('Process Type', solicitationInfo.rowsHash().ProcessType),
            Click.on(solicitation.lookupInputFieldClearIcon('Department')),
            solicitation.selectLookupDropdownItem('Department', solicitationInfo.rowsHash().Department),
            solicitation.selectItemInlookupPopup('Bid Manager', solicitationInfo.rowsHash().BidManager, 'Resource Name'),
            solicitation.clickSingleCheckBox('Bidder Meeting Required', solicitationInfo.rowsHash().BidderMeetingRequired),
            solicitation.fillTextInputField('Bidder Meeting Location', solicitationInfo.rowsHash().BidderMeetingLocation),
            solicitation.fillTextInputField('Contact', solicitationInfo.rowsHash().Contact),
            solicitation.fillTextInputField('Phone', solicitationInfo.rowsHash().Phone),
            solicitation.fillTextInputField('Email', solicitationInfo.rowsHash().Email),
            solicitation.fillTextInputField('Address', solicitationInfo.rowsHash().Address),
            // 先清除输入框的内容
            Click.on(solicitation.ralationshipAttributeLookupFieldClearIcon('Associated Projects')),
            solicitation.selectItemInRelationshipAttributeInLookupPopup('Associated Projects', solicitationInfo.rowsHash().AssociatedProjects, 'Project Name'),
            Click.on(solicitation.ralationshipAttributeLookupFieldClearIcon('Classifications')),
            solicitation.selectrelationshipAttributeLookupDropdownItem('Classifications', solicitationInfo.rowsHash().Classifications),
            Click.on(solicitation.ralationshipAttributeLookupFieldClearIcon('NAICS')),
            solicitation.selectNAICSItemInlookupPopup('NAICS', solicitationInfo.rowsHash().NAICS, 'NAICS Code'),

            solicitation.selectSpecialDate('Q&A Deadline', qaDateline, 2),
            solicitation.selectClock('Q&A Deadline', qaDatelineTime),
            solicitation.selectSpecialDate('Bidder Meeting Date', bidderMeetingDate, 3),
            solicitation.selectClock('Bidder Meeting Date', bidderMeetingTime),

            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible()
        );
    }
};

export const checkUpdatedSolicitationGeneralInfo = {
    using: (solicitationInfo: DataTable) => {
        return Task.where(`#actor check updated contract general information`,
            Check.whether(
                Page.current().title(), includes(SOLICITATION_MANAGEMENT)
            ).andIfSo(
                Log.the('current page is Solicitation Management')
            ).otherwise(
                browseSolicitation.searchItemAndEdit(BROWSE_SOLICITATIONS, 'Solicitation ID', Cookie.called(COOKIE_SOLICITATION_ID).value())
            ),
            solicitation.checkTextInputFieldValue('Solicitation ID', Cookie.called(COOKIE_SOLICITATION_ID).value(), SUCCEEDED),
            solicitation.checkTextInputFieldValue('Solicitation Name', Cookie.called(COOKIE_SOLICITATION_NAME).value(), SUCCEEDED),
            solicitation.checkDateInputFieldValue('Publication Date', solicitationInfo.rowsHash().PublicationDate, SUCCEEDED),
            solicitation.checkDateInputFieldValue('Bid Due Date', solicitationInfo.rowsHash().BidDueDate, SUCCEEDED),
            solicitation.checkDropdownInputFieldValue('Status', solicitationInfo.rowsHash().Status, SUCCEEDED),
            solicitation.checkDropdownInputFieldValue('Process Type', solicitationInfo.rowsHash().ProcessType, SUCCEEDED),
            Ensure.eventually(solicitation.departmentLookupInputFieldValue('Department', solicitationInfo.rowsHash().Department), isVisible()),
            solicitation.checkLookupInputFieldSingleValue('Bid Manager', solicitationInfo.rowsHash().BidManager, SUCCEEDED),
            solicitation.checkTextInputFieldValue('Bidder Meeting Location', solicitationInfo.rowsHash().BidderMeetingLocation, SUCCEEDED),
            solicitation.checkTextInputFieldValue('Contact', solicitationInfo.rowsHash().Contact, SUCCEEDED),
            solicitation.checkTextInputFieldValue('Phone', solicitationInfo.rowsHash().Phone, SUCCEEDED),
            solicitation.checkTextInputFieldValue('Email', solicitationInfo.rowsHash().Email, SUCCEEDED),
            solicitation.checkTextInputFieldValue('Address', solicitationInfo.rowsHash().Address, SUCCEEDED),
            Ensure.eventually(Text.of(solicitation.relationshipAttributeLookupInputFieldMultiValue('Associated Projects').first()), includes(solicitationInfo.rowsHash().AssociatedProjects)),
            solicitation.checkRelationshipAttributeLookupInputFieldMultiValue('Classifications', solicitationInfo.rowsHash().Classifications, SUCCEEDED),
            solicitation.checkTreeLookupInputFieldMultiValue('NAICS', solicitationInfo.rowsHash().NAICS, SUCCEEDED),
        )

    }

}

export const deleteSolicitation = {
    using: (solicitationID: string | Question<any>) =>
        Task.where(`#actor delete solicitation ${solicitationID}`,
            clickButton.using(DELETE),
            clickSolicitationMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))
        )
}
