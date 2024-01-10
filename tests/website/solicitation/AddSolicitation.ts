import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes } from '@serenity-js/assertions'
import { Duration, Task, Wait } from '@serenity-js/core';
import { Page } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { checkTipMessage } from '../common/CheckTipMessage';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common/index';
import { COOKIE_SOLICITATION_ID, COOKIE_SOLICITATION_NAME } from '../common/statics/StaticCookie';
import { ADD_SOLICITATION, SOLICITATION_MANAGEMENT } from '../common/statics/StaticPageName';
import { solicitation } from './components/EditSolicitationFields';
/**
 * 添加solicitation
//  */

export const addSolicitationByRequiredFields= {
    using: (solicitaitonInfo: DataTable) => {
        return Task.where(`#actor submit solicitation information with required fields`,
            openPage.using(ADD_SOLICITATION),
            // 填入必填字段
            fillSolicitationRequiredFields.using(solicitaitonInfo.rowsHash().Type, 
                solicitaitonInfo.rowsHash().SolicitationID, 
                solicitaitonInfo.rowsHash().SolicitationName,
                solicitaitonInfo.rowsHash().PublicationDate, 
                solicitaitonInfo.rowsHash().BidDueDate),
            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}


export const addSolicitationByAllFields= {
    using: (solicitaitonInfo: DataTable) => {
        return Task.where(`#actor submit solicitation information with all fields`,
            openPage.using(ADD_SOLICITATION),
            // 填入必填字段
            fillSolicitationRequiredFields.using(solicitaitonInfo.rowsHash().Type, 
                solicitaitonInfo.rowsHash().SolicitationID, 
                solicitaitonInfo.rowsHash().SolicitationName,
                solicitaitonInfo.rowsHash().PublicationDate, 
                solicitaitonInfo.rowsHash().BidDueDate),
            // 填入非必填字段               
            fillSolicitationNotRequiredFields.using(solicitaitonInfo),
            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillSolicitationRequiredFields = {
    using: (type: string, SolicitationID: string, SolicitationName: string, PublicationDate: string, BidDueDate: string) => {
        const timestamp = formatted_now;
        const publicationDateParts = PublicationDate.split(' ');
        const publicationDate = publicationDateParts[0];
        const publicationTime = publicationDateParts[1] + ' ' + publicationDateParts[2];

        const BidDueDateParts = BidDueDate.split(' ');
        const bidDueDate = BidDueDateParts[0];
        const BidDueTime = BidDueDateParts[1] + ' ' + BidDueDateParts[2];

        return Task.where(`#actor fill solicitation with required fields`,
            // 选完Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            solicitation.selectDropdownItem('Type', type),
            Wait.for(Duration.ofSeconds(5)),
            solicitation.fillTextInputField('Solicitation ID', SolicitationID + timestamp),
            solicitation.setCookie(COOKIE_SOLICITATION_ID, SolicitationID + timestamp),

            solicitation.fillTextInputField('Solicitation Name', SolicitationName + timestamp),
            solicitation.setCookie(COOKIE_SOLICITATION_NAME, SolicitationName + timestamp),

            solicitation.selectSpecialDate('Publication Date', publicationDate, 0),
            solicitation.selectClock('Publication Date', publicationTime),
            solicitation.selectSpecialDate('Bid Due Date', bidDueDate, 1),
            solicitation.selectClock('Bid Due Date', BidDueTime)
        );
    }
};

export const checkAddSolicitationResult = {
    using: (result: string) => {
        return result == SUCCEEDED ? Task.where(`#actor check add solicitation result`,
            Ensure.eventually(Page.current().title(), includes(SOLICITATION_MANAGEMENT))
        ) : Task.where(`#actor check add solicitation result`,
            checkTipMessage.using()
        );
    }
}

export const fillSolicitationNotRequiredFields = {
    using: (solicitationInfo: DataTable) => {
        // 添加非空校验
        if (!solicitationInfo || solicitationInfo.rows().length === 0) {
            return Task.where(`#actor skip fill solicitaiton with not required fields`);
        }

        const qaDateline = solicitationInfo.rowsHash().QADateline || '';
        const bidderMeetingDate = solicitationInfo.rowsHash().BidderMeetingDate || '';

        const tasks = [
            solicitation.clickSingleCheckBox('Is Sealed Bid', solicitationInfo.rowsHash().IsSealedBid),
            solicitation.selectDropdownItem('Status', solicitationInfo.rowsHash().Status),
            solicitation.selectDropdownItem('Process Type', solicitationInfo.rowsHash().ProcessType),
            solicitation.selectLookupDropdownItem('Department', solicitationInfo.rowsHash().Department),
            solicitation.selectItemInlookupPopup('Bid Manager', solicitationInfo.rowsHash().BidManager, 'Resource Name'),
            solicitation.clickSingleCheckBox('Bidder Meeting Required', solicitationInfo.rowsHash().BidderMeetingRequired),
            solicitation.fillTextInputField('Bidder Meeting Location', solicitationInfo.rowsHash().BidderMeetingLocation),
            solicitation.fillTextInputField('Contact', solicitationInfo.rowsHash().Contact),
            solicitation.fillTextInputField('Phone', solicitationInfo.rowsHash().Phone),
            solicitation.fillTextInputField('Email', solicitationInfo.rowsHash().Email),
            solicitation.fillTextInputField('Address', solicitationInfo.rowsHash().Address),
            solicitation.selectItemInRelationshipAttributeInLookupPopup('Associated Projects', solicitationInfo.rowsHash().AssociatedProjects, 'Project Name'),
            solicitation.selectrelationshipAttributeLookupDropdownItem('Classifications', solicitationInfo.rowsHash().Classifications),
            solicitation.selectNAICSItemInlookupPopup('NAICS', solicitationInfo.rowsHash().NAICS, 'NAICS Code'),
        ];

        // 添加非空校验并构建任务列表
        if (qaDateline) {
            const QADatelineParts = qaDateline.split(' ');
            const qaDatelineTime = QADatelineParts[1] + ' ' + QADatelineParts[2];
            tasks.push(
                solicitation.selectSpecialDate('Q&A Deadline', QADatelineParts[0], 2),
                solicitation.selectClock('Q&A Deadline', qaDatelineTime)
            );
        }

        if (bidderMeetingDate) {
            const BidderMeetingDateParts = bidderMeetingDate.split(' ');
            const bidderMeetingTime = BidderMeetingDateParts[1] + ' ' + BidderMeetingDateParts[2];
            tasks.push(
                solicitation.selectSpecialDate('Bidder Meeting Date', BidderMeetingDateParts[0], 3),
                solicitation.selectClock('Bidder Meeting Date', bidderMeetingTime)
            );
        }

        return Task.where(`#actor fill solicitaiton with not required fields`, ...tasks);
    }
};
