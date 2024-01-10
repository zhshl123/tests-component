"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDeletedSubProject = exports.deleteSubProject = exports.checkSubProject = exports.fillSubProjectRequiredFields = exports.addSubProject = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const components_1 = require("../components");
const EditProjectFields_1 = require("../components/EditProjectFields");
const ProjectTab_1 = require("../components/ProjectTab");
exports.addSubProject = {
    using: (subProjectInfo) => {
        return core_1.Task.where(`#actor add sub project`, ProjectTab_1.projectTab.clickTab('Implementation'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ProjectTab_1.projectTab.clickTab('Structure'), assertions_1.Ensure.eventually(EditProjectFields_1.project.addMasterProjectButton(), (0, assertions_1.isPresent)()), common_1.clickButton.using(DefaultStaticParams_1.ADD_SUB_PROJECT), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 填入必填字段
        exports.fillSubProjectRequiredFields.using(subProjectInfo.rowsHash().Project, subProjectInfo.rowsHash().Department, subProjectInfo.rowsHash().Program, subProjectInfo.rowsHash().Currency), 
        // 提交
        common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), EditProjectFields_1.project.waitMessagePopupBoxVisible(), core_1.Wait.for(core_1.Duration.ofSeconds(10)));
    }
};
exports.fillSubProjectRequiredFields = {
    using: (Project, Department, Program, Currency) => {
        const timestamp_master = common_1.formatted_now;
        return core_1.Task.where(`#actor fill project with required fields`, 
        // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
        EditProjectFields_1.project.fillTextInputField('Project', Project + timestamp_master), EditProjectFields_1.project.setCookie(statics_1.COOKIE_SUB_PROJECT_NAME, Project + timestamp_master), EditProjectFields_1.project.selectDropdownItem('Program', Program), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // project.selectDropdownItem('Currency', Currency),
        // Wait.for(Duration.ofSeconds(5)),
        //Department:点击输入框
        web_1.Click.on(EditProjectFields_1.project.lookupInputField('Department')), 
        // 确保下拉框有值之后再点击lookup图标
        assertions_1.Ensure.eventually(EditProjectFields_1.project.lookupDropdownList('Department').first(), (0, assertions_1.isPresent)()), 
        //点击下拉框的值
        web_1.Click.on(EditProjectFields_1.project.lookupDropdownItem('Department', Department)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkSubProject = {
    using: (projectName) => {
        return core_1.Task.where(`#actor check sub project information`, components_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), assertions_1.Ensure.eventually(EditProjectFields_1.project.firstExpandIconInGrid(), (0, web_1.isVisible)()), web_1.Click.on(EditProjectFields_1.project.firstExpandIconInGrid()), common_1.checkTextInGridList.using(web_1.Cookie.called(statics_1.COOKIE_SUB_PROJECT_NAME).value()));
    }
};
exports.deleteSubProject = {
    using: (projectName) => {
        return core_1.Task.where(`#actor delete sub project information`, components_1.browseProject.clickIDLink(1), core_1.Wait.until(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT)), common_1.clickActionButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkDeletedSubProject = {
    using: (projectName, subProjectName) => {
        return core_1.Task.where(`#actor check deleted sub project information`, components_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName), assertions_1.Ensure.eventually(EditProjectFields_1.project.firstExpandIconInGrid(), (0, assertions_1.not)((0, web_1.isVisible)())), components_1.browseProject.searchItemInBrowsePage(statics_1.BROWSE_IMPLEMENTATION_PROJECT, 'Project', subProjectName), components_1.browseProject.checkSearchResult(subProjectName, DefaultStaticParams_1.FAILED));
    }
};
//# sourceMappingURL=SubProject.js.map