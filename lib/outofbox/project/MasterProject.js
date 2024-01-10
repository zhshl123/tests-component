"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMasterProject = exports.checkParentProjectField = exports.fillMasterProjectFields = exports.addMasterProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditProjectFields_1 = require("./components/EditProjectFields");
const ProjectTab_1 = require("./components/ProjectTab");
exports.addMasterProject = {
    using: (masterProjectInfo) => {
        return core_1.Task.where(`#actor submit add master project information`, ProjectTab_1.projectTab.clickTab('Structure'), assertions_1.Ensure.eventually(EditProjectFields_1.project.addMasterProjectButton(), (0, assertions_1.isPresent)()), common_1.clickButton.using(DefaultStaticParams_1.ADD_MASTER_PROJECT), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 填入必填字段
        exports.fillMasterProjectFields.using(masterProjectInfo), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillMasterProjectFields = {
    using: (masterProjectInfo) => {
        const timestamp_master = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', masterProjectInfo.rowsHash().Project + timestamp_master), EditProjectFields_1.project.setCookie(statics_1.COOKIE_MASTER_PROJECT_NAME, masterProjectInfo.rowsHash().Project + timestamp_master), EditProjectFields_1.project.selectDropdownItem('Project Phase', masterProjectInfo.rowsHash().ProjectPhase));
    }
};
exports.checkParentProjectField = {
    using: () => {
        return core_1.Task.where(`#actor check the Master Project shown in the Parent Project Field of Project1`, ProjectTab_1.projectTab.clickTab('Implementation'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(web_1.Text.of(EditProjectFields_1.project.readOnlyLookupFieldValue('Master Project')), (0, assertions_1.includes)(web_1.Cookie.called(statics_1.COOKIE_MASTER_PROJECT_NAME).value())));
    }
};
exports.deleteMasterProject = {
    using: (projectName) => core_1.Task.where(`#actor delete Master Project ${projectName}`, ProjectTab_1.projectTab.clickTab('Structure'), assertions_1.Ensure.eventually(EditProjectFields_1.project.addMasterProjectButton(), (0, assertions_1.isPresent)()), web_1.Click.on(EditProjectFields_1.project.projectStructureTreeBranch(web_1.Cookie.called(statics_1.COOKIE_MASTER_PROJECT_NAME).value())), core_1.Wait.for(core_1.Duration.ofSeconds(3)), ProjectTab_1.projectTab.clickTab('General'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.DELETE_PARENT_ONLY), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
//# sourceMappingURL=MasterProject.js.map