"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMasterProject = exports.checkParentProjectField = exports.fillMasterProjectRequiredFields = exports.addMasterProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const EditProjectFields_1 = require("../components/EditProjectFields");
const ProjectTab_1 = require("../components/ProjectTab");
exports.addMasterProject = {
    using: (masterProjectInfo) => {
        return core_1.Task.where(`#actor submit add master project information`, ProjectTab_1.projectTab.clickTab('Implementation'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ProjectTab_1.projectTab.clickTab('Structure'), assertions_1.Ensure.eventually(EditProjectFields_1.project.addMasterProjectButton(), (0, assertions_1.isPresent)()), common_1.clickButton.using(DefaultStaticParams_1.ADD_MASTER_PROJECT), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 填入必填字段
        exports.fillMasterProjectRequiredFields.using(masterProjectInfo.rowsHash().Project, masterProjectInfo.rowsHash().Department, masterProjectInfo.rowsHash().Program, masterProjectInfo.rowsHash().Currency), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), EditProjectFields_1.project.waitMessagePopupBoxVisible(), core_1.Wait.for(core_1.Duration.ofSeconds(10)));
    }
};
exports.fillMasterProjectRequiredFields = {
    using: (Project, Department, Program, Currency) => {
        const timestamp_master = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', Project + timestamp_master), EditProjectFields_1.project.setCookie(statics_1.COOKIE_MASTER_PROJECT_NAME, Project + timestamp_master), EditProjectFields_1.project.selectDropdownItem('Program', Program), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // project.selectDropdownItem('Currency', Currency),
        // Wait.for(Duration.ofSeconds(5)),
        //Department:点击输入框
        web_1.Click.on(EditProjectFields_1.project.lookupInputField('Department')), 
        // 确保下拉框有值之后再点击lookup图标
        assertions_1.Ensure.eventually(EditProjectFields_1.project.lookupDropdownList('Department').first(), (0, assertions_1.isPresent)()), 
        // //点击下拉框的值
        web_1.Click.on(EditProjectFields_1.project.lookupDropdownItem('Department', Department)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkParentProjectField = {
    using: () => {
        return core_1.Task.where(`#actor check the Master Project shown in the Parent Project Field of Project1`, assertions_1.Ensure.eventually(web_1.Text.of(EditProjectFields_1.project.lookupInputFieldSingleValue('Parent Project')), (0, assertions_1.includes)(web_1.Cookie.called(statics_1.COOKIE_MASTER_PROJECT_NAME).value())));
    }
};
exports.deleteMasterProject = {
    using: (projectName) => core_1.Task.where(`#actor delete Master Project ${projectName}`, common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.DELETE_PARENT_ONLY), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=MasterProject.js.map