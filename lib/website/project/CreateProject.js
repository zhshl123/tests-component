"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillProjectRequiredFields = exports.addProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditProjectFields_1 = require("./components/EditProjectFields");
/**
 * 添加project
 */
exports.addProject = {
    using: (projectInfo) => {
        return core_1.Task.where(`#actor submit add project information`, 
        // openPage.using(ADD_PROJECT),
        // 填入必填字段
        exports.fillProjectRequiredFields.using(projectInfo.rowsHash().Project, projectInfo.rowsHash().Department, projectInfo.rowsHash().Program, projectInfo.rowsHash().Currency), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.ADD), EditProjectFields_1.project.waitMessagePopupBoxVisible(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillProjectRequiredFields = {
    using: (Project, Department, Program, Currency) => {
        // eslint-disable-next-line prefer-const
        let timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', Project + timestamp), EditProjectFields_1.project.setCookie(statics_1.COOKIE_PROJECT_NAME, Project + timestamp), EditProjectFields_1.project.fillDropdownInputField('Program', Program), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditProjectFields_1.project.fillDropdownInputField('Currency', Currency), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        //Department:点击输入框
        web_1.Click.on(EditProjectFields_1.project.lookupInputField('Department')), 
        // 确保下拉框有值之后再点击lookup图标
        assertions_1.Ensure.eventually(EditProjectFields_1.project.lookupDropdownList('Department').first(), (0, assertions_1.isPresent)()), 
        // //点击下拉框的值
        web_1.Click.on(EditProjectFields_1.project.lookupDropdownItem('Department', Department)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=CreateProject.js.map