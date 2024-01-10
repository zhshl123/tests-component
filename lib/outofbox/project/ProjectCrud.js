"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProjectStatus = exports.confirmBatchApprovalProject = exports.selectBatchApprovalProject = exports.checkApprovedPlanningProject = exports.assignPlanningProjectManager = exports.openProject = exports.closeoutProject = exports.deleteProject = exports.checkUpdatedProjectGeneralInfo = exports.updateProjectGeneralInfo = exports.addProjectWithDynamicScenario = exports.addApprovedProjectAndProjectScoping = exports.addApprovedProject = exports.fillProjectFields = exports.addApprovedPlanningProject = exports.addPlanningProject = exports.addProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCS_1 = require("../cycle-scenario/EditCS");
const FinancialForm_1 = require("../scoping/FinancialForm");
const BrowseProjectFields_1 = require("./components/BrowseProjectFields");
const EditProjectFields_1 = require("./components/EditProjectFields");
const ProjectTab_1 = require("./components/ProjectTab");
/**
 * 添加project
 */
exports.addProject = {
    using: (projectInfo) => {
        EditProjectFields_1.project.cycle = projectInfo.rowsHash().Cycle;
        return core_1.Task.where(`#actor submit add implementation project information`, 
        // 填入必填字段
        exports.fillProjectFields.using(projectInfo), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible());
    }
};
exports.addPlanningProject = {
    using: (projectInfo) => {
        EditProjectFields_1.project.cycle = projectInfo.rowsHash().Cycle;
        return core_1.Task.where(`#actor submit planning project information`, EditProjectFields_1.project.checkReadOnlyLabelValue('Project Phase', 'Planning', DefaultStaticParams_1.SUCCEEDED), EditProjectFields_1.project.checkReadOnlyLabelValue('Project Status', 'Preapproved', DefaultStaticParams_1.SUCCEEDED), 
        // 填入必填字段
        exports.fillProjectFields.using(projectInfo), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible());
    }
};
exports.addApprovedPlanningProject = {
    using: (projectInfo) => {
        EditProjectFields_1.project.cycle = projectInfo.rowsHash().Cycle;
        return core_1.Task.where(`#actor submit approved project information`, EditProjectFields_1.project.checkReadOnlyLabelValue('Project Phase', 'Planning', DefaultStaticParams_1.SUCCEEDED), EditProjectFields_1.project.checkReadOnlyLabelValue('Project Status', 'Approved', DefaultStaticParams_1.SUCCEEDED), 
        // 填入必填字段
        exports.fillProjectFields.using(projectInfo), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible());
    }
};
exports.fillProjectFields = {
    using: (projectInfo) => {
        EditProjectFields_1.project.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, EditProjectFields_1.project.selectDropdownItem('Cycle', projectInfo.rowsHash().Cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.selectDropdownItem('Scenario', projectInfo.rowsHash().Scenario), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', projectInfo.rowsHash().Project + EditProjectFields_1.project.timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + EditProjectFields_1.project.timestamp), EditProjectFields_1.project.selectDropdownItem('Program', projectInfo.rowsHash().Program), EditProjectFields_1.project.selectDropdownItem('Department', projectInfo.rowsHash().Department));
    }
};
/**
 * 添加approved的project
 */
exports.addApprovedProject = {
    using: (projectName) => {
        EditProjectFields_1.project.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor submit add project information`, EditProjectFields_1.project.fillTextInputField('Project', projectName + EditProjectFields_1.project.timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, projectName + EditProjectFields_1.project.timestamp), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
/**
 * 添加project
 */
exports.addApprovedProjectAndProjectScoping = {
    using: (projectInfo) => {
        EditProjectFields_1.project.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor submit add project information`, EditProjectFields_1.project.fillTextInputField('Project', projectInfo.rowsHash().ProjectName + EditProjectFields_1.project.timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, projectInfo.rowsHash().ProjectName + EditProjectFields_1.project.timestamp), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), core_1.Wait.for(core_1.Duration.ofSeconds(5)), BrowseProjectFields_1.browseProject.openPlanningProjectInBrowseImplementationPage(web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value()), 
        // 保存scoping
        ProjectTab_1.projectTab.clickTab('Scoping'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), FinancialForm_1.saveScopingAllocation.using(projectInfo));
    }
};
exports.addProjectWithDynamicScenario = {
    using: (projectInfo) => {
        EditProjectFields_1.project.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor submit add project information`, 
        // 填入必填字段
        EditProjectFields_1.project.selectDropdownItem('Cycle', projectInfo.rowsHash().Cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.selectDropdownItem('Scenario', projectInfo.rowsHash().Scenario + EditCS_1.CS.timestamp), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', projectInfo.rowsHash().Project + EditProjectFields_1.project.timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + EditProjectFields_1.project.timestamp), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible());
    }
};
exports.updateProjectGeneralInfo = {
    using: (projectInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update project general information`, EditProjectFields_1.project.fillTextInputField('Project', projectInfo.rowsHash().Project + timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + timestamp), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkUpdatedProjectGeneralInfo = {
    using: (projectInfo) => {
        return core_1.Task.where(`#actor check updated project general information`, EditProjectFields_1.project.checkTextInputFieldValue('Project', web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value(), DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteProject = {
    using: (projectName) => core_1.Task.where(`#actor delete Project ${projectName}`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
exports.closeoutProject = {
    using: (projectName) => core_1.Task.where(`#actor closeout Project ${projectName}`, ProjectTab_1.projectTab.clickTab('Closeout'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.selectDropdownItem('Open/Closed Status', 'Closed'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
const openProject = () => core_1.Task.where(`#actor open Project`, ProjectTab_1.projectTab.clickTab('Closeout'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.selectDropdownItem('Open/Closed Status', 'Open'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.openProject = openProject;
exports.assignPlanningProjectManager = {
    using: (username) => {
        return core_1.Task.where(`#actor assign planning project manager`, EditProjectFields_1.project.selectItemInlookupPopup('Project Manager', username, 'Resource Name'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
const checkApprovedPlanningProject = () => {
    return core_1.Task.where(`#actor check approved planning project`, common_1.openPage.using(statics_1.BROWSE_DRAFT_PLANNING_PROJECT), core_1.Wait.for(core_1.Duration.ofSeconds(2)), BrowseProjectFields_1.browseProject.selectDropdownItem('Cycle', EditProjectFields_1.project.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), BrowseProjectFields_1.browseProject.selectScenarioLookupDropdownItem('Draft Plan'), BrowseProjectFields_1.browseProject.selectLookupDropdownItem('Project Phase', 'Planning'), BrowseProjectFields_1.browseProject.selectLookupDropdownItem('Project Status', 'Approved'), BrowseProjectFields_1.browseProject.fillTextInputField('Project', web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value()), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), BrowseProjectFields_1.browseProject.checkSearchResult(web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value(), DefaultStaticParams_1.SUCCEEDED));
};
exports.checkApprovedPlanningProject = checkApprovedPlanningProject;
exports.selectBatchApprovalProject = {
    using: (buttonName) => {
        return core_1.Task.where(`#actor select the batch approval project`, BrowseProjectFields_1.browseProject.searchItemInBrowsePlanningProjectPage(statics_1.BROWSE_DRAFT_PLANNING_PROJECT, EditProjectFields_1.project.cycle, 'Project', web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value()), BrowseProjectFields_1.browseProject.checkSearchResult(web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value(), DefaultStaticParams_1.SUCCEEDED), web_1.Click.on(BrowseProjectFields_1.browseProject.firstCheckboxInGrid()), common_1.clickSectionButton.using(buttonName), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
const confirmBatchApprovalProject = () => {
    return core_1.Task.where(`#actor confirm the batch approval project`, EditProjectFields_1.project.selectCopySelectedProjectDropdownItem('Cycle1', EditProjectFields_1.project.cycle), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(EditProjectFields_1.project.copySelectedProjectDropdownField('Scenario1')), (0, assertions_1.equals)('Approved Plans')), EditProjectFields_1.project.selectCopySelectedProjectDropdownItem('Scenario1', 'Draft Plans'), web_1.Click.on(EditProjectFields_1.project.copySelectedProjectScopingCheckbox()), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on(EditProjectFields_1.project.copySelectedProjectOKButton()));
};
exports.confirmBatchApprovalProject = confirmBatchApprovalProject;
exports.changeProjectStatus = {
    using: (status) => {
        return core_1.Task.where(`#actor change project status:${status}`, ProjectTab_1.projectTab.clickTab('Implementation'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.selectDropdownItem('Project Status', 'Active'), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=ProjectCrud.js.map