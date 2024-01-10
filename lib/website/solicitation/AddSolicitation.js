"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillSolicitationNotRequiredFields = exports.checkAddSolicitationResult = exports.fillSolicitationRequiredFields = exports.addSolicitationByAllFields = exports.addSolicitationByRequiredFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const CheckTipMessage_1 = require("../common/CheckTipMessage");
const index_1 = require("../common/index");
const StaticCookie_1 = require("../common/statics/StaticCookie");
const StaticPageName_1 = require("../common/statics/StaticPageName");
const EditSolicitationFields_1 = require("./components/EditSolicitationFields");
/**
 * 添加solicitation
//  */
exports.addSolicitationByRequiredFields = {
    using: (solicitaitonInfo) => {
        return core_1.Task.where(`#actor submit solicitation information with required fields`, index_1.openPage.using(StaticPageName_1.ADD_SOLICITATION), 
        // 填入必填字段
        exports.fillSolicitationRequiredFields.using(solicitaitonInfo.rowsHash().Type, solicitaitonInfo.rowsHash().SolicitationID, solicitaitonInfo.rowsHash().SolicitationName, solicitaitonInfo.rowsHash().PublicationDate, solicitaitonInfo.rowsHash().BidDueDate), 
        // 提交
        index_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, index_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.addSolicitationByAllFields = {
    using: (solicitaitonInfo) => {
        return core_1.Task.where(`#actor submit solicitation information with all fields`, index_1.openPage.using(StaticPageName_1.ADD_SOLICITATION), 
        // 填入必填字段
        exports.fillSolicitationRequiredFields.using(solicitaitonInfo.rowsHash().Type, solicitaitonInfo.rowsHash().SolicitationID, solicitaitonInfo.rowsHash().SolicitationName, solicitaitonInfo.rowsHash().PublicationDate, solicitaitonInfo.rowsHash().BidDueDate), 
        // 填入非必填字段               
        exports.fillSolicitationNotRequiredFields.using(solicitaitonInfo), 
        // 提交
        index_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, index_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillSolicitationRequiredFields = {
    using: (type, SolicitationID, SolicitationName, PublicationDate, BidDueDate) => {
        const timestamp = index_1.formatted_now;
        const publicationDateParts = PublicationDate.split(' ');
        const publicationDate = publicationDateParts[0];
        const publicationTime = publicationDateParts[1] + ' ' + publicationDateParts[2];
        const BidDueDateParts = BidDueDate.split(' ');
        const bidDueDate = BidDueDateParts[0];
        const BidDueTime = BidDueDateParts[1] + ' ' + BidDueDateParts[2];
        return core_1.Task.where(`#actor fill solicitation with required fields`, 
        // 选完Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
        EditSolicitationFields_1.solicitation.selectDropdownItem('Type', type), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditSolicitationFields_1.solicitation.fillTextInputField('Solicitation ID', SolicitationID + timestamp), EditSolicitationFields_1.solicitation.setCookie(StaticCookie_1.COOKIE_SOLICITATION_ID, SolicitationID + timestamp), EditSolicitationFields_1.solicitation.fillTextInputField('Solicitation Name', SolicitationName + timestamp), EditSolicitationFields_1.solicitation.setCookie(StaticCookie_1.COOKIE_SOLICITATION_NAME, SolicitationName + timestamp), EditSolicitationFields_1.solicitation.selectSpecialDate('Publication Date', publicationDate, 0), EditSolicitationFields_1.solicitation.selectClock('Publication Date', publicationTime), EditSolicitationFields_1.solicitation.selectSpecialDate('Bid Due Date', bidDueDate, 1), EditSolicitationFields_1.solicitation.selectClock('Bid Due Date', BidDueTime));
    }
};
exports.checkAddSolicitationResult = {
    using: (result) => {
        return result == DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check add solicitation result`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.includes)(StaticPageName_1.SOLICITATION_MANAGEMENT))) : core_1.Task.where(`#actor check add solicitation result`, CheckTipMessage_1.checkTipMessage.using());
    }
};
exports.fillSolicitationNotRequiredFields = {
    using: (solicitationInfo) => {
        // 添加非空校验
        if (!solicitationInfo || solicitationInfo.rows().length === 0) {
            return core_1.Task.where(`#actor skip fill solicitaiton with not required fields`);
        }
        const qaDateline = solicitationInfo.rowsHash().QADateline || '';
        const bidderMeetingDate = solicitationInfo.rowsHash().BidderMeetingDate || '';
        const tasks = [
            EditSolicitationFields_1.solicitation.clickSingleCheckBox('Is Sealed Bid', solicitationInfo.rowsHash().IsSealedBid),
            EditSolicitationFields_1.solicitation.selectDropdownItem('Status', solicitationInfo.rowsHash().Status),
            EditSolicitationFields_1.solicitation.selectDropdownItem('Process Type', solicitationInfo.rowsHash().ProcessType),
            EditSolicitationFields_1.solicitation.selectLookupDropdownItem('Department', solicitationInfo.rowsHash().Department),
            EditSolicitationFields_1.solicitation.selectItemInlookupPopup('Bid Manager', solicitationInfo.rowsHash().BidManager, 'Resource Name'),
            EditSolicitationFields_1.solicitation.clickSingleCheckBox('Bidder Meeting Required', solicitationInfo.rowsHash().BidderMeetingRequired),
            EditSolicitationFields_1.solicitation.fillTextInputField('Bidder Meeting Location', solicitationInfo.rowsHash().BidderMeetingLocation),
            EditSolicitationFields_1.solicitation.fillTextInputField('Contact', solicitationInfo.rowsHash().Contact),
            EditSolicitationFields_1.solicitation.fillTextInputField('Phone', solicitationInfo.rowsHash().Phone),
            EditSolicitationFields_1.solicitation.fillTextInputField('Email', solicitationInfo.rowsHash().Email),
            EditSolicitationFields_1.solicitation.fillTextInputField('Address', solicitationInfo.rowsHash().Address),
            EditSolicitationFields_1.solicitation.selectItemInRelationshipAttributeInLookupPopup('Associated Projects', solicitationInfo.rowsHash().AssociatedProjects, 'Project Name'),
            EditSolicitationFields_1.solicitation.selectrelationshipAttributeLookupDropdownItem('Classifications', solicitationInfo.rowsHash().Classifications),
            EditSolicitationFields_1.solicitation.selectNAICSItemInlookupPopup('NAICS', solicitationInfo.rowsHash().NAICS, 'NAICS Code'),
        ];
        // 添加非空校验并构建任务列表
        if (qaDateline) {
            const QADatelineParts = qaDateline.split(' ');
            const qaDatelineTime = QADatelineParts[1] + ' ' + QADatelineParts[2];
            tasks.push(EditSolicitationFields_1.solicitation.selectSpecialDate('Q&A Deadline', QADatelineParts[0], 2), EditSolicitationFields_1.solicitation.selectClock('Q&A Deadline', qaDatelineTime));
        }
        if (bidderMeetingDate) {
            const BidderMeetingDateParts = bidderMeetingDate.split(' ');
            const bidderMeetingTime = BidderMeetingDateParts[1] + ' ' + BidderMeetingDateParts[2];
            tasks.push(EditSolicitationFields_1.solicitation.selectSpecialDate('Bidder Meeting Date', BidderMeetingDateParts[0], 3), EditSolicitationFields_1.solicitation.selectClock('Bidder Meeting Date', bidderMeetingTime));
        }
        return core_1.Task.where(`#actor fill solicitaiton with not required fields`, ...tasks);
    }
};
//# sourceMappingURL=AddSolicitation.js.map