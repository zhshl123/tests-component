"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWorkflowComment = exports.checkWorkflowStatusAndComment = exports.reviewWorkflowTask = exports.assignRiskReviewer = exports.checkWorkflowParticipant = exports.addRiskFromProject = exports.deleteRisk = exports.checkRisk = exports.editRisk = exports.addRisk = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const BrowseProjectFields_1 = require("../project/components/BrowseProjectFields");
const ProjectTab_1 = require("../project/components/ProjectTab");
const BrowseRisk_1 = require("./BrowseRisk");
const EditRisk_1 = require("./EditRisk");
exports.addRisk = {
    using: (riskInfo) => {
        const timestamp = common_1.formatted_now;
        EditRisk_1.risk.riskId = riskInfo.rowsHash().RiskID + timestamp;
        return core_1.Task.where(`#actor Input all fields and save `, EditRisk_1.risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.setCookie(statics_1.COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle), EditRisk_1.risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType), EditRisk_1.risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus), EditRisk_1.risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability), EditRisk_1.risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact), EditRisk_1.risk.selectItemInlookupPopup('Owners', riskInfo.rowsHash().Owners, 'User Login Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), EditRisk_1.risk.waitMessagePopupBoxVisible());
    }
};
exports.editRisk = {
    using: (riskInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditRisk_1.risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.setCookie(statics_1.COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp), EditRisk_1.risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle), EditRisk_1.risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType), EditRisk_1.risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus), EditRisk_1.risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability), EditRisk_1.risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact), EditRisk_1.risk.selectItemInlookupPopup('Owners1', riskInfo.rowsHash().Owners1, 'User Login Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), EditRisk_1.risk.waitMessagePopupBoxVisible());
    }
};
exports.checkRisk = {
    using: (riskInfo) => {
        return core_1.Task.where(`#actor check all fields`, core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditRisk_1.risk.checkTextInputFieldValue('Risk ID', web_1.Cookie.called(statics_1.COOKIE_RISK_ID).value(), DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkTextInputFieldValue('Risk Title', riskInfo.rowsHash().RiskTitle, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Risk Type', riskInfo.rowsHash().RiskType, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Risk Status', riskInfo.rowsHash().RiskStatus, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkNumberInputFieldValue('Probability', riskInfo.rowsHash().Probability, DefaultStaticParams_1.SUCCEEDED), EditRisk_1.risk.checkDropdownInputFieldValue('Impact', riskInfo.rowsHash().Impact, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteRisk = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.addRiskFromProject = {
    using: (riskInfo) => {
        return core_1.Task.where(`#actor add risk from project`, BrowseProjectFields_1.browseProject.searchAndEditImplementationProject(riskInfo.rowsHash().Project), core_1.Wait.for(core_1.Duration.ofSeconds(3)), ProjectTab_1.projectTab.clickTab('Risks'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Switch.to(BrowseRisk_1.browseRiskInfo.riskTabFrame()).and(web_1.Click.on(BrowseRisk_1.browseRiskInfo.addNewIcon()), core_1.Wait.for(core_1.Duration.ofSeconds(3))), exports.addRisk.using(riskInfo));
    }
};
exports.checkWorkflowParticipant = {
    using: (username) => {
        return username === '(no participant)' ? core_1.Task.where(`#actor check workflow participant with ${username}`, assertions_1.Ensure.eventually(EditRisk_1.riskWorkflow.participantsTable(), (0, assertions_1.isPresent)()), core_1.Check.whether(EditRisk_1.risk.lookupInputFieldUl('Assigned To'), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('risk review already assigned')).otherwise(assertions_1.Ensure.eventually(EditRisk_1.riskWorkflow.participantsTableCell('(no participant)'), (0, assertions_1.isPresent)()))) : core_1.Task.where(`#actor check workflow participant with ${username}`, assertions_1.Ensure.eventually(EditRisk_1.riskWorkflow.participantsTable(), (0, assertions_1.isPresent)()), core_1.Check.whether(EditRisk_1.risk.lookupInputFieldUl('Assigned To'), (0, assertions_1.isPresent)()).andIfSo(assertions_1.Ensure.eventually(EditRisk_1.riskWorkflow.participantsTableCell(username), (0, assertions_1.isPresent)())).otherwise(assertions_1.Ensure.eventually(EditRisk_1.riskWorkflow.participantsTableCell('(no participant)'), (0, assertions_1.isPresent)())));
    }
};
exports.assignRiskReviewer = {
    using: (reviewer) => {
        return core_1.Task.where(`#actor assign risk reviewer with ${reviewer}`, EditRisk_1.risk.selectItemInlookupPopup('Assigned To', reviewer, 'Resource Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.reviewWorkflowTask = {
    using: (reviewResult, comment) => {
        return core_1.Task.where(`#actor select risk workflow review result with ${reviewResult} and add comment: ${comment}`, 
        // 添加comment
        assertions_1.Ensure.eventually(EditRisk_1.risk.commentSectionFrame(), (0, assertions_1.isPresent)()), web_1.Switch.to(EditRisk_1.risk.commentSectionFrame()).and(web_1.Click.on(EditRisk_1.risk.addCommentIcon())), core_1.Wait.until(EditRisk_1.risk.addCommentPanel(), (0, assertions_1.isPresent)()), web_1.Switch.to(EditRisk_1.risk.addCommentPanel()).and(web_1.Enter.theValue(comment).into(EditRisk_1.risk.addCommentPanelCommentInputField()), web_1.Click.on(EditRisk_1.risk.addCommentPanelSaveButton()), core_1.Wait.for(core_1.Duration.ofSeconds(3))), EditRisk_1.riskWorkflow.acceptWorkflowTaskAndsubmitReviewResult(reviewResult));
    }
};
exports.checkWorkflowStatusAndComment = {
    using: (comment) => {
        return core_1.Task.where(`#actor check workflow status and comment`, exports.checkWorkflowComment.using(comment), core_1.Check.whether(EditRisk_1.riskWorkflow.reviewResultInput(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow task already accepted')).otherwise(assertions_1.Ensure.eventually((0, common_1.targetButton)('Accept Workflow Task'), (0, assertions_1.isPresent)())));
    }
};
exports.checkWorkflowComment = {
    using: (comment) => {
        return core_1.Task.where(`#actor check workflow  comment`, assertions_1.Ensure.eventually(EditRisk_1.risk.commentSectionFrame(), (0, assertions_1.isPresent)()), web_1.Switch.to(EditRisk_1.risk.commentSectionFrame()).and(assertions_1.Ensure.eventually(EditRisk_1.risk.commentListTableCell(comment), (0, assertions_1.isPresent)())));
    }
};
//# sourceMappingURL=RiskCrud.js.map