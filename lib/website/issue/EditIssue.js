"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIssue = exports.checkIssueInfo = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.checkIssueInfo = {
    using: (issueInfo) => {
        return core_1.Task.where(`#actor checks issue information`, components_1.issue.checkTextInputFieldValue('Issue ID', web_1.Cookie.called(statics_1.COOKIE_ISSUE_ID).value(), DefaultStaticParams_1.SUCCEEDED), components_1.issue.checkTextInputFieldValue('Issue Title', web_1.Cookie.called(statics_1.COOKIE_ISSUE_TITLE).value(), DefaultStaticParams_1.SUCCEEDED), components_1.issue.checkDateInputFieldValue('Date Reported', issueInfo.rowsHash().DateReported, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteIssue = () => {
    return core_1.Task.where(`#actor deletes issue information`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteIssue = deleteIssue;
//# sourceMappingURL=EditIssue.js.map