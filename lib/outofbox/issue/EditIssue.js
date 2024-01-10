"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.checkIssueStatus = exports.checkIssueInfo = exports.updateIssueFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.updateIssueFields = {
    using: (issueInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor edit issue information`, components_1.issue.selectItemInlookupPopup('Project', issueInfo.rowsHash().cstm_AssociatedProjectId, 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), components_1.issue.selectItemInlookupPopup('Contract', issueInfo.rowsHash().cstm_AssociatedContractId, 'Contract Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), components_1.issue.fillTextInputField('Issue ID', issueInfo.rowsHash().IssueID + timestamp), components_1.issue.setCookie(statics_1.COOKIE_ISSUE_ID, issueInfo.rowsHash().IssueID + timestamp), components_1.issue.fillTextInputField('Issue Title', issueInfo.rowsHash().IssueTitle + timestamp), components_1.issue.setCookie(statics_1.COOKIE_ISSUE_TITLE, issueInfo.rowsHash().IssueID + timestamp), components_1.issue.selectSpecialDate('Date Reported', issueInfo.rowsHash().DateReported, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkIssueInfo = {
    using: (issueInfo) => {
        return core_1.Task.where(`#actor checks issue information`, assertions_1.Ensure.eventually(web_2.Text.of(components_1.issue.lookupInputFieldSingleValue('Project')), (0, assertions_1.includes)(issueInfo.rowsHash().cstm_AssociatedProjectId)), assertions_1.Ensure.eventually(web_2.Text.of(components_1.issue.lookupInputFieldSingleValue('Contract')), (0, assertions_1.includes)(issueInfo.rowsHash().cstm_AssociatedContractId)), components_1.issue.checkTextInputFieldValue('Issue ID', web_1.Cookie.called(statics_1.COOKIE_ISSUE_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.issue.checkTextInputFieldValue('Issue Title', web_1.Cookie.called(statics_1.COOKIE_ISSUE_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.issue.checkDateInputFieldValue('Date Reported', issueInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.checkIssueStatus = {
    using: (issueInfo) => {
        return core_1.Task.where(`#actor checks issue information`, components_1.issue.checkDropdownInputFieldValue('Status', issueInfo.rowsHash().IssueStatusID, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteIssue = () => {
    return core_1.Task.where(`#actor deletes issue information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteIssue = deleteIssue;
//# sourceMappingURL=EditIssue.js.map