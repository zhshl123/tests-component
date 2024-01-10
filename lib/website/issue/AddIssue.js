"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillIssueRequiredFields = exports.addIssue = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.addIssue = {
    using: (issueInfo) => {
        return core_1.Task.where(`#actor add issue information`, exports.fillIssueRequiredFields.using(issueInfo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillIssueRequiredFields = {
    using: (issueInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill issue required fields`, components_1.issue.selectDropdownItem('Category', issueInfo.rowsHash().Category), components_1.issue.fillTextInputField('Issue ID', issueInfo.rowsHash().IssueID + timestamp), components_1.issue.setCookie(statics_1.COOKIE_ISSUE_ID, issueInfo.rowsHash().IssueID + timestamp), components_1.issue.fillTextInputField('Issue Title', issueInfo.rowsHash().IssueTitle + timestamp), components_1.issue.setCookie(statics_1.COOKIE_ISSUE_TITLE, issueInfo.rowsHash().IssueID + timestamp), components_1.issue.fillDateInputField('Date Reported', issueInfo.rowsHash().DateReported));
    }
};
//# sourceMappingURL=AddIssue.js.map